import * as React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { getArtworkById } from '../../services/ArtworkService';
import FullScreenCamera from '../../components/FullScreenCamera';
import styles from './styles';

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
    this.setLoading = this.setLoading.bind(this);
    this.state = {
      isLoading: false,
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <FullScreenCamera
          setLoading={this.setLoading}
          onPictureTaken={this.handlePictureTaken}
        />
        {this.state.isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
      </View>
    );
  }

  private setLoading(value: boolean) {
    this.setState({ isLoading: value });
  }

  private async handlePictureTaken(imageData: string) {
    // const artwork = await getArtworkByPicture('');
    const artwork = await getArtworkById(22);
    // fake 400ms load time
    await new Promise(resolve => setTimeout(resolve, 400));
    this.setLoading(false);
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
