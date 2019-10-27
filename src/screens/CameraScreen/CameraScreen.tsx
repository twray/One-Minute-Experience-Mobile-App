import * as React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  SafeAreaView,
  NetInfo,
  Modal
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import FullScreenCamera from '../../components/FullScreenCamera';
import IntroCards from '../../components/IntroCards';
import styles from './styles';
import {
  recognizeImage,
  compressAndFormatImage,
  getArtworkByTagId
} from '../../services/ArtworkService';

interface CameraScreenProps extends NavigationScreenProps {}

interface CameraScreenState {
  isLoading: boolean;
  isOffline: boolean;
  byIdDialog: boolean;
  safeAreaMessage: string;
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
    this.setLoading = this.setLoading.bind(this);
    this.setSafeAreaMessage = this.setSafeAreaMessage.bind(this);
    this.unsetSafeAreaMessage = this.unsetSafeAreaMessage.bind(this);

    this.state = {
      isLoading: false,
      isOffline: true,
      safeAreaMessage: '',
      byIdDialog: false
    };

  }

  public componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectionChange,
    );

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
        <IntroCards />
        <Modal animationType="fade" visible={false} onRequestClose={() => null}>
          <View style={{}} />
        </Modal>
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
      const { artworkRecognized, artwork } = await recognizeImage(image);

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
      console.log(e);
      return;
    } finally {
      this.setLoading(false);
    }

  }

}
