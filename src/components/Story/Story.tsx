import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Carousel, {
  Pagination,
  ParallaxImage,
  AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import StorySegment from '../StorySegment/StorySegment';
import { IStorySegment } from '../../services/ArtworkService';
import { itemWidth, sliderWidth } from '../../styles/Story';
import styles, { colors } from '../../styles';

export interface StoryProps {
  segments: IStorySegment[];
}
export interface StoryState {
  slider1ActiveSlider: number;
}
class StoryCarousel extends Carousel<IStorySegment> {}
export default class Story extends React.Component<StoryProps, StoryState> {
  constructor(props: StoryProps) {
    super(props);
    this.state = {
      slider1ActiveSlider: 1,
    };
  }

  public renderItem({ item }: { item: IStorySegment }) {
    return <StorySegment text={item.text} />;
  }

  public render() {
    const { slider1ActiveSlider } = this.state;
    return (
      <View>
        <Carousel
          data={this.props.segments}
          renderItem={this.renderItem}
          vertical={false}
          layout={'default'}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onSnapToItem={index => this.setState({ slider1ActiveSlider: index })}
        />
        <Pagination
          dotsLength={this.props.segments.length}
          activeDotIndex={slider1ActiveSlider}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />

        {/* {this.props.segments.map((segment, index) => (
          <StorySegment key={segment.id} text={segment.text} />
        ))} */}
      </View>
    );
  }
}
