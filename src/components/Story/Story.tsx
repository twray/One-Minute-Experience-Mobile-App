import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import StorySegment from '../StorySegment/StorySegment';
import { IStorySegment, IArtwork } from '../../services/ArtworkService';
import { itemWidth, sliderWidth } from '../../styles/Story';
import styles, { colors } from '../../styles';

export interface StoryProps {
  artwork: IArtwork;
}
export interface StoryState {
  sliderActiveSlider: number;
}
export default class Story extends React.Component<StoryProps, StoryState> {
  constructor(props: StoryProps) {
    super(props);
    this.state = {
      sliderActiveSlider: 0,
    };
    this.renderItem = this.renderItem.bind(this);
  }

  public renderItem({ item }: { item: IStorySegment }) {
    return (
      <StorySegment
        artwork={this.props.artwork}
        story={item}
        index={this.state.sliderActiveSlider}
      />
    );
  }

  public render() {
    const { sliderActiveSlider } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Carousel
          data={this.props.artwork.stories}
          renderItem={this.renderItem}
          vertical={false}
          layout={'default'}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onSnapToItem={index => this.setState({ sliderActiveSlider: index })}
        />
        <Pagination
          dotsLength={this.props.artwork.stories.length}
          activeDotIndex={sliderActiveSlider}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  }
}
