import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  createNavigator,
  SwitchNavigator,
  createNavigationContainer,
} from 'react-navigation';
import styles from './style';
import Card from './../Card/Card';
import { IArtwork, IStorySegment } from '../../services/ArtworkService';

export interface StorySegmentProps {
  index: number;
  artwork: IArtwork;
  story: IStorySegment;
}

export interface StorySegmentState {}

export default class StorySegment extends React.Component<
  StorySegmentProps,
  StorySegmentState
> {
  constructor(props: StorySegmentProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { index } = this.props;
    if (index === 0) {
      return this.renderFirstItem();
    } else {
      return this.renderItem();
    }
  }
  public renderFirstItem() {
    return (
      <View style={{ flex: 1 }}>
        <Card artwork={this.props.artwork} story={this.props.story} />
      </View>
    );
  }

  public renderItem() {
    return (
      <View>
        <Text>Not first item</Text>
      </View>
    );
  }
}
