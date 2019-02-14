import * as React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import FullScreenCamera from '../components/FullScreenCamera';

import styles from '../styles';

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

  private handlePictureTaken(imageData: string) {
    Alert.alert(`Picture taken! 📸\n${imageData.substring(0, 15)}...`);
    this.props.navigation.navigate('StoryModal');
  }

  private showStory() {
    this.props.navigation.navigate('StoryModal');
  }

  private goToFavorites() {
    this.props.navigation.navigate('Favorites');
  }
}
