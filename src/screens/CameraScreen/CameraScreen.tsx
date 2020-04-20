import * as React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  SafeAreaView,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';
import { RootStackParamList } from '../../screens/';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import FullScreenCamera from '../../components/FullScreenCamera';
import IntroCards from '../../components/IntroCards';
import styles from './styles';
import {
  recognizeImage,
  compressAndFormatImage,
  IArtwork
} from '../../services/ArtworkService';
import AnalyticsService from '../../services/AnalyticsService';

type CameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Camera'
>;

interface CameraScreenProps {
  navigation: CameraScreenNavigationProp;
}

interface CameraScreenState {
  isLoading: boolean;
  isOffline: boolean;
  safeAreaMessage: string;
  showTutorialScreen: boolean;
}

export default class CameraScreen extends React.Component<
  CameraScreenProps,
  CameraScreenState
> {
  public static navigationOptions = {
    header: null,
  };

  unsubscribeNetInfo?: NetInfoSubscription;

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
      showTutorialScreen: false,
      safeAreaMessage: ''
    };

  }

  public async componentDidMount() {

    const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');

    if (!alreadyLaunched) {
      this.setState({showTutorialScreen: true});
    } else {
      await AsyncStorage.setItem('alreadyLaunched', 'true');
    }

    this.unsubscribeNetInfo = NetInfo.addEventListener(state => {
      this.handleConnectionChange(state.isConnected);
    });

    NetInfo.fetch().then(state => {
      this.handleConnectionChange(state.isConnected)
    });

  }

  public componentWillUnmount() {
    this.unsubscribeNetInfo && this.unsubscribeNetInfo();
  }

  private handleConnectionChange(isConnected: boolean) {
    this.setState({isOffline: !isConnected});
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
      const { artworkRecognized, artworks } = await recognizeImage(image);

      if (artworkRecognized && artworks && artworks.length > 0) {

        if (this.state.safeAreaMessage) {
          this.unsetSafeAreaMessage();
        }
        this.setState({showTutorialScreen: false});
        AnalyticsService.instance.artworkScanSuccess();

        if (artworks.length === 1) {
          const artwork: IArtwork = artworks[0];
          this.props.navigation.navigate('StoryModal', {
            artwork
          });
        } else if (artworks.length > 1) {
          this.props.navigation.navigate('StorySelector', {
            artworks
          });
        }

      } else if (!artworkRecognized) {
        AnalyticsService.instance.artworkScanFail();
        this.setSafeAreaMessage('We don\'t have a story for this artwork.\nPlease try another.');
      }

    } catch (e) {
      AnalyticsService.instance.artworkScanFail();
      this.setSafeAreaMessage('A problem occurred while recognising the artwork.\nPlease check that your phone has an Internet connection and try again.');
      return;
    } finally {
      this.setLoading(false);
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <FullScreenCamera
          setLoading={this.setLoading}
          onPictureTaken={this.handlePictureTaken}
        />
        <View style={styles.helpButtonContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Info')}>
            <Entypo name="info-with-circle" color="#FCFCFC" size={30} />
          </TouchableOpacity>
        </View>
        {this.state.showTutorialScreen && <IntroCards />}
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

}
