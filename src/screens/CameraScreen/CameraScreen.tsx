import * as React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ImageManipulator } from 'expo';

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

  private async handlePictureTaken(imageData: ImageManipulator.ImageResult) {
    // const artwork = await getArtworkByPicture('');
    const formBody = new FormData();
    const uri = imageData.uri;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    formBody.append('file', {
      uri: imageData.uri,
      name: `image.${fileType}`,
      type: `image/${fileType}`,
    });

    const fetchUrl = 'http://modgift.itu.dk:8080/api/artwork/rec';
    const fetchData = {
      method: 'POST',
      body: formBody,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await fetch(fetchUrl, fetchData);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
    }

    this.setLoading(false);
    const artwork = await getArtworkById(22);
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
