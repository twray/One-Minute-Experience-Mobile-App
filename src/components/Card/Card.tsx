import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
  ImageBackground,
} from 'react-native';
import styles from './style';
import { IArtwork, IStorySegment } from '../../services/ArtworkService';
import { AuthSession } from 'expo';

export interface CardProps {
  // image: ImageSourcePropType;
  artwork: IArtwork;
  story: IStorySegment;
}

export interface CardState {}

export default class Card extends React.Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {
      title,
      artistName,
      artistNationality,
      releaseYear,
      imageUrl,
    } = this.props.artwork;
    const { text } = this.props.story;
    return (
      <View style={styles.card}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.info}>
          <Text style={styles.title}>{`${title}, ${releaseYear}`}</Text>
          <Text>
            {artistName},{artistNationality}
          </Text>
          <Text>Image: {imageUrl}</Text>
          <Text>Swipe to begin</Text>
        </View>
      </View>
    );
  }
}
