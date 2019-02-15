import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';

import FullScreenCamera from '../components/FullScreenCamera';
import { getArtworkByPicture } from '../services/ArtworkService';

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
    const artwork = await getArtworkByPicture('');
    this.props.navigation.navigate('StoryModal', {
      artwork,
    });
  }

  private showStory() {
    this.props.navigation.navigate('StoryModal');
  }

  private goToFavorites() {
    this.props.navigation.navigate('Favorites');
  }
}
