import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import styles from '../styles';

interface FavoritesScreenProps extends NavigationScreenProps {}

export default class FavoritesScreen extends React.Component<
  FavoritesScreenProps,
  {}
> {
  public static navigationOptions = {
    title: 'Favorites',
  };

  constructor(props: FavoritesScreenProps) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.fullCenterView}>
        <Text>This is a list of my favorite artworks</Text>
      </View>
    );
  }
}
