import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import { IStorySegment, IArtwork } from '../../services/ArtworkService';
import styles from './styles';
import GeneralStorySegment from './GeneralStorySegment';

interface StorySegmentProps {
  artwork: IArtwork;
}

class StoryFrontSegment extends React.Component<StorySegmentProps, {}> {
  constructor(props: StorySegmentProps) {
    super(props);
  }

  public render() {
    const { artwork } = this.props;
    return (
      <GeneralStorySegment artwork={artwork}>
        <View style={{ flex: 4, width: "100%" }}>
          <Image
            source={{ uri: artwork.image_url }}
            style={{ flex: 1 }}
          />
        </View>
      </GeneralStorySegment>
    );
  }
}

export default StoryFrontSegment;
