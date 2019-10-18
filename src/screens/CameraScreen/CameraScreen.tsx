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
  getArtworkById
} from '../../services/ArtworkService';
import Constants from 'expo-constants';

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
    this.setSafeAreaMessage = this.setSafeAreaMessage.bind(this);
    this.unsetSafeAreaMessage = this.unsetSafeAreaMessage.bind(this);
    this.state = {
      isLoading: false,
      isOffline: true,
      safeAreaMessage: '',
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
          title="Open Artwork by ID"
          message="Write the ID of the Artwork"
          submitText="Open Artwork"
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
        {this.state.safeAreaMessage ? (
          <SafeAreaView style={styles.safeAreaView}>
            <Text style={styles.safeText}>
              {this.state.safeAreaMessage}
            </Text>
          </SafeAreaView>
        ) : null}
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

    try {

      const artwork = await getArtworkById(id);

      if (artwork) {
        this.props.navigation.navigate('StoryModal', {
          artwork,
        });
      } else {
        return;
      }

      await this.setState({
        byIdDialog: false,
      });

    } catch (error) {

      console.error(error);

    }
  }

  private handleConnectionChange(isConnected: boolean) {
    if (!isConnected) {
      this.setSafeAreaMessage('It appears like you are offline.\nArtworks might not be recognized.');
    } else if (isConnected) {
      this.unsetSafeAreaMessage();
    }
  }

  private setLoading(value: boolean) {
    this.setState({ isLoading: value });
  }

  private setSafeAreaMessage(message: string) {
    this.setState({ safeAreaMessage: message });
  }

  private unsetSafeAreaMessage() {
    this.setState({ safeAreaMessage: '' });
  }

  private async handlePictureTaken(imageUri: string) {

    try {

      const image = await compressAndFormatImage(imageUri);
      console.log('image has been compressed and formatted');

      const { artworkRecognized, artwork } = await recognizeImage(image.uri);

      if (artworkRecognized && artwork) {

        if (this.state.safeAreaMessage) {
          this.unsetSafeAreaMessage();
        }

        this.props.navigation.navigate('StoryModal', {
          artwork,
        });

      } else if (!artworkRecognized) {

        this.setSafeAreaMessage('We don\'t have a story for this artwork.\nPlease try another.');

      }

    } catch (e) {

      this.setSafeAreaMessage('A problem occurred while recognising the artwork.\nPlease try again.');
      return;

    } finally {

      this.setLoading(false);

    }

  }

  private goToFavorites() {
    this.props.navigation.navigate('Favorites');
  }
}
