import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  createNavigator,
  SwitchNavigator,
  createNavigationContainer,
} from 'react-navigation';

export interface StorySegmentProps {
  text: string;
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
    return (
      <View>
        <Text>{this.props.text}</Text>
      </View>
    );
  }
}
