import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import styles from '../styles';
import {
  getArtworkById,
  getArtworkByPicture,
} from '../services/ArtworkService';
import { Constants } from 'expo';

import FullScreenCamera from '../components/FullScreenCamera';
interface CameraScreenProps extends NavigationScreenProps {}

export default class CameraScreen extends React.Component<
  CameraScreenProps,
  {}
> {
  public static navigationOptions = {
    header: null,
  };

  constructor(props: CameraScreenProps) {
    super(props);
    this.handlePictureTaken = this.handlePictureTaken.bind(this);
  }

  public render() {
    return <FullScreenCamera onPictureTaken={this.handlePictureTaken} />;
  }

  private async handlePictureTaken(imageData: string) {
    // const artwork = await getArtworkByPicture('');
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
