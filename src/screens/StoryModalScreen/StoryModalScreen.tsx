import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '..';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import styles from './styles';
import ArtworkStory from '../../components/ArtworkStory';
import { IArtwork } from '../../services/ArtworkService';
import AnalyticsService from '../../services/AnalyticsService';

type StoryModalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'StoryModal'
>;

type StoryModalRouteProp = RouteProp<
  RootStackParamList,
  'StoryModal'
>;

interface StoryModalScreenProps {
  navigation: StoryModalScreenNavigationProp,
  route: StoryModalRouteProp
}

export default class StoryModalScreen extends React.Component<
  StoryModalScreenProps,
  {}
> {

  componentDidMount() {
    const artwork: IArtwork = this.props.route.params.artwork;
    AnalyticsService.instance.viewStory(`${artwork.id}: ${artwork.artist_name} - ${artwork.title}`);
  }

  componentWillUnmount() {
    const artwork: IArtwork = this.props.route.params.artwork;
    AnalyticsService.instance.readStory(`${artwork.id}: ${artwork.artist_name} - ${artwork.title}`);
  }

  public render() {
    const artwork: IArtwork = this.props.route.params.artwork;
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
