import * as React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import styles from '../styles';
import {
  getArtworkById,
  getArtworkByPicture,
} from '../services/ArtworkService';
import { Constants } from 'expo';

import FullScreenCamera from '../components/FullScreenCamera';

interface CameraScreenProps extends NavigationScreenProps {}

interface CameraScreenState {
  isLoading: boolean;
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
    this.state = {
      isLoading: false,
    };
  }

  public render() {
    return (
      <View style={{ flex: 1 }}>
        <FullScreenCamera onPictureTaken={this.handlePictureTaken} />
        {this.state.isLoading ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" />
            {/* <Text style={{ color: 'white', marginTop: 10 }}>Fetching...</Text> */}
          </View>
        ) : null}
      </View>
    );
  }

  private async handlePictureTaken(imageData: string) {
    this.setState({ isLoading: true });
    // const artwork = await getArtworkByPicture('');
    const artwork = await getArtworkById(22);
    // fake 400ms load time
    await new Promise(resolve => setTimeout(resolve, 400));
    this.setState({ isLoading: false });
    this.props.navigation.navigate('StoryModal', {
      artwork,
    });
  }

  private async showStory() {
    this.props.navigation.navigate('StoryModal', {
      artwork: await getArtworkById(22),
    });
  }

  private goToFavorites() {
    this.props.navigation.navigate('Favorites');
  }
}
