import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { IStorySegment, IArtwork } from '../../services/ArtworkService';

interface StorySegmentProps extends IStorySegment {
  index: number;
  imageUrl?: string;
  artwork: IArtwork;
}

const StorySegment = (props: StorySegmentProps) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.card}>
        {/* { props.index === 0 ? renderHeader() : null } */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 400,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'black',
    elevation: 1,
  },
});

export default StorySegment;
