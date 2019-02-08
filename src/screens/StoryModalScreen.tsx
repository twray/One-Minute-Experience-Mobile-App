import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  IArtwork,
  IStorySegment,
  getArtworkById,
} from './../services/ArtworkService';

import styles from '../styles';
import StorySegment from '../components/StorySegment';
import Story from '../components/Story';

interface StoryModalScreenProps extends NavigationScreenProps {}

export default class StoryModalScreen extends React.Component<
  StoryModalScreenProps,
  {}
> {
  constructor(props: StoryModalScreenProps) {
    super(props);
  }

  public render() {
    const artwork = this.props.navigation.getParam('artwork');
    if (!artwork) return <View />;
    return (
      <View style={styles.fullCenterView}>
        <Text>Mona Lisa, Good ol' Leo, 1993</Text>
        <Story segments={artwork.stories} />
        <Button
          title="Dismiss"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
