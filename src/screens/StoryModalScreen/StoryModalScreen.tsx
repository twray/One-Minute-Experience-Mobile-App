import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';

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
    return (
      <View style={styles.container}>
        <ArtworkStory {...artwork} />
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="close" color="#FCFCFC" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}
