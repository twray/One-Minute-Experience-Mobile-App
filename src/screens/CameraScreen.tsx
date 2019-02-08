import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

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
  }

  public render() {
    return (
      <View style={styles.fullCenterView}>
        <Text>CameraScreen</Text>
        <Button title="Show story" onPress={() => this.showStory()} />
        <Button title="Go to favorites" onPress={() => this.goToFavorites()} />
      </View>
    );
  }

  private showStory() {
    this.props.navigation.navigate('StoryModal');
  }

  private goToFavorites() {
    this.props.navigation.navigate('Favorites');
  }
}
