import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  IArtwork,
  IStorySegment,
  getArtworkById,
} from './../services/ArtworkService';
import { Constants } from 'expo';
import styles from '../styles';
import Story from '../components/Story/Story';
import StorySegStoment from '../components/StorySegment/StorySegment';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native';

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
      <View
        style={{
          top: Constants.statusBarHeight,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Text>Mona Lisa, Good ol' Leo, 1993</Text>
        <Story artwork={artwork} />
        <Button
          title="Dismiss"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
