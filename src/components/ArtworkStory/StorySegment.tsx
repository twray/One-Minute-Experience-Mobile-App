import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

import { IStorySegment, IArtwork } from '../../services/ArtworkService';
import styles from './styles';
import GeneralStorySegment from './GeneralStorySegment';

interface StorySegmentProps extends IStorySegment {
  artwork: IArtwork;
}

class StorySegment extends React.Component<StorySegmentProps, {}> {
  constructor(props: StorySegmentProps) {
    super(props);
  }

  public render() {
    const { artwork } = this.props;
    return (
      <GeneralStorySegment artwork={artwork}>
        <View style={styles.TextWrapper}>
          <ScrollView
            style={{ flex: 1 }}
            alwaysBounceVertical={false}
          >
            <Text style={styles.TextView}>{this.props.text}</Text>
          </ScrollView>
        </View>
      </GeneralStorySegment>
    );
  }
}

export default StorySegment;
