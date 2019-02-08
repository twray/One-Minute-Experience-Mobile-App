import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StorySegment from './StorySegment';
import { IStorySegment } from '../services/ArtworkService';

export interface StoryProps {
  segments: IStorySegment[];
}

export interface StoryState {}

export default class Story extends React.Component<StoryProps, StoryState> {
  constructor(props: StoryProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View>
        {this.props.segments.map((segment, index) => (
          <StorySegment key={segment.id} text={segment.text} />
        ))}
      </View>
    );
  }
}
