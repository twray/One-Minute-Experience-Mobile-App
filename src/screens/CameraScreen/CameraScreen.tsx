import * as React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  SafeAreaView,
  NetInfo,
  Button,
  Modal,
  Alert,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import FullScreenCamera from '../../components/FullScreenCamera';
import styles from './styles';
import {
  recognizeImage,
  compressAndFormatImage,
} from '../../services/ArtworkService';
import { Constants } from 'expo';

import DialogInput from '../../components/DialogInput';

interface CameraScreenProps extends NavigationScreenProps {}

interface CameraScreenState {
  isLoading: boolean;
  isOffline: boolean;
  byIdDialog: boolean;
}

export default class CameraScreen extends React.Component<
  CameraScreenProps,
  CameraScreenState
> {
  public static navigationOptions = {
    header: null,
  };

  constructor(props: CameraScreenProps) {
    super(props);
    this.handlePictureTaken = this.handlePictureTaken.bind(this);
    this.handleConnectionChange = this.handleConnectionChange.bind(this);
    this.openSearchModal = this.openSearchModal.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.state = {
      isLoading: false,
      isOffline: true,
      byIdDialog: false,
    };
  }

  public componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectionChange,
    );

    // tslint:disable-next-line: ter-arrow-parens
    NetInfo.isConnected.fetch().then(e => {
      this.handleConnectionChange(e);
    });
  }

  public componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionChange,
    );
  }

  public render() {
    return (
      <View style={styles.container}>
        <FullScreenCamera
          setLoading={this.setLoading}
          onPictureTaken={this.handlePictureTaken}
        />
        <DialogInput
          isDialogVisible={this.state.byIdDialog}
          title="Open artwork by ID"
          message="Write the artwork ID and press continue"
          submitText="Continue"
          closeDialog={() => this.setState({ byIdDialog: false })}
          submitInput={input => this.searchById(input)}
        />
        <Modal animationType="fade" visible={false} onRequestClose={() => null}>
          <View style={{}} />
        </Modal>
        <View
          style={{
            top: Constants.statusBarHeight + 1,
            right: 10,
            position: 'absolute',
          }}
        >
          <Button title="By Id" onPress={this.openSearchModal} />
        </View>
        {this.state.isOffline && (
          <SafeAreaView style={styles.safeAreaView}>
            <Text style={styles.safeText}>
              It appears like you are offline.
              {'\n'}
              Artworks might not be recognized.
            </Text>
          </SafeAreaView>
        )}
        {this.state.isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
      </View>
    );
  }

  private openSearchModal() {
    this.setState({
      byIdDialog: true,
    });
  }

  private async searchById(input: string) {
    await this.setState({
      byIdDialog: false,
    });
    const id = parseInt(input, 10);
    if (Number.isNaN(id)) {
      return;
    }

    console.log(`got id ${id}`);

    try {
      const response = await fetch('http://modgift.itu.dk:8080/api/test');
      const artworks = await response.json();
      const artwork = artworks.find((a: any) => a.id === id);
      console.log(`got artwork ${artwork ? artwork.title : 'none'}`);
      if (!artwork) {
        return;
      }

      this.props.navigation.navigate('StoryModal', {
        artwork,
      });
    } catch (error) {
      console.error(error);
    }

    await this.setState({
      byIdDialog: false,
    });
    return;
  }

  private handleConnectionChange(isConnected: boolean) {
    this.setState({
      isOffline: !isConnected,
    });
  }

  private setLoading(value: boolean) {
    this.setState({ isLoading: value });
  }

  private async handlePictureTaken(imageUri: string) {
    try {
      const image = await compressAndFormatImage(imageUri);
      const { success, artwork } = await recognizeImage(image.uri);
      if (success && artwork) {
        if (!artwork.imageUrl) {
          (artwork as any).imageUrl = `https://picsum.photos/900/1440?image=${Math.floor(
            Math.random() * 300,
          )}`;
        }

        this.props.navigation.navigate('StoryModal', {
          artwork,
        });
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      // console.error(e);
    } finally {
      this.setLoading(false);
    }
  }

  private goToFavorites() {
    this.props.navigation.navigate('Favorites');
  }
}
