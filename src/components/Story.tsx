import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StorySegment from './StorySegment';

export interface StoryProps {
  segments: StorySegment[];
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
        {this.props.segments.map((segment, index) => {
          <StorySegment text={segment.text} />;
        })}
      </View>
    );
  }
}
