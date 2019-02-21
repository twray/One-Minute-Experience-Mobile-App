import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import styles from './styles';
import ArtworkStory from '../../components/ArtworkStory';
import { IArtwork } from '../../services/ArtworkService';

interface StoryModalScreenProps extends NavigationScreenProps {}

export default class StoryModalScreen extends React.Component<
  StoryModalScreenProps,
  {}
> {
  constructor(props: StoryModalScreenProps) {
    super(props);
  }

  public render() {
    const artwork: IArtwork = this.props.navigation.getParam('artwork');
    if (!artwork) return <View />;
    return (
      <View style={styles.container}>
        <ArtworkStory {...artwork} />
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={{ fontSize: 30 }}>✖</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
