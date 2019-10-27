import * as React from 'react';
import {
  View,
  Dimensions,
  ImageBackground,
  Animated,
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import StorySegment from './StorySegment';
import { IArtwork, IStorySegment } from '../../services/ArtworkService';
import StoryFrontSegment from './StoryFrontSegment';
import styles from './styles';

interface ArtworkStoryProps extends IArtwork {}

interface ArtworkStoryState {
  activeSegmentIndex: number;
  backgroundOpacity: Animated.Value;
}

interface ArtworkFront {
  type: 'ArtworkFront';
  image_url: string;
  title: string;
}

type Segment = ArtworkFront | IStorySegment;

export default class ArtworkStory extends React.Component<
  ArtworkStoryProps,
  ArtworkStoryState
> {

  private readonly carousel: React.RefObject<Carousel<IStorySegment>>;

  constructor(props: ArtworkStoryProps) {
    super(props);
    this.state = {
      activeSegmentIndex: 0,
      backgroundOpacity: new Animated.Value(0),
    };
    this.carousel = React.createRef();
    this.renderItem = this.renderItem.bind(this);
    this.getActiveDotColor = this.getActiveDotColor.bind(this);
    this.getInactiveDotColor = this.getInactiveDotColor.bind(this);

  }

  public render() {

    const { width, height } = Dimensions.get('window');
    const segments: Segment[] = [
      {
        type: 'ArtworkFront',
        image_url: this.props.image_url,
        title: this.props.title,
      },
      ...this.props.stories,
    ];

    return (
      <View style={styles.ArtworkStory}>
        <Animated.View
            style={styles.FullScreen}
          >
          <ImageBackground
            blurRadius={20}
            resizeMode="cover"
            source={{ uri: this.props.image_url, cache: 'reload' }}
            style={styles.ViewBoxContainer}
          />
        </Animated.View>

        <View style={styles.CarouselContainer}>
          <Carousel
            data={segments}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={width * 0.8}
            itemHeight={height}
            useScrollView={true}
            onSnapToItem={(index: number) => {
              this.setState({ activeSegmentIndex: index });
            }}
          />
          <Pagination
            dotsLength={segments.length}
            activeDotIndex={this.state.activeSegmentIndex}
            dotColor={this.getActiveDotColor()}
            dotStyle={styles.PaginationDots}
            inactiveDotOpacity={1.0}
            inactiveDotScale={1.0}
            inactiveDotColor={this.getInactiveDotColor()}
          />
        </View>
      </View>
    );
  }

  private renderItem({ item }: { item: Segment; index: number }) {
    return (
      <View style={{ flex: 1 }}>
        {'type' in item ? (
          <StoryFrontSegment artwork={this.props} />
        ) : (
          <StorySegment artwork={this.props} text={item.text} id={item.id} />
        )}
      </View>
    );
  }

  private getActiveDotColor(): string {
    return 'rgba(0, 0, 0, 0.7)';
  }

  private getInactiveDotColor(): string {
    return '#FCFCFC';
  }
}
