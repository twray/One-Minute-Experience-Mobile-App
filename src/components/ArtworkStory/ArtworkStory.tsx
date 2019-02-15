import * as React from 'react';
import { View, Text, Dimensions, ImageBackground } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import StorySegment from './StorySegment';
import { IArtwork, IStorySegment } from '../../services/ArtworkService';

interface ArtworkStoryProps extends IArtwork {}

interface ArtworkStoryState {
  activeSegmentIndex: number;
}

interface ArtworkFront {
  type: 'ArtworkFront';
  imageUrl: string;
  title: string;
}

type Segment = ArtworkFront | IStorySegment;

export default class ArtworkStory extends React.Component<
  ArtworkStoryProps,
  ArtworkStoryState
> {
  private carousel: React.RefObject<Carousel<IStorySegment>>;

  constructor(props: ArtworkStoryProps) {
    super(props);
    this.state = {
      activeSegmentIndex: 0,
    };
    this.carousel = React.createRef();
    this.renderItem = this.renderItem.bind(this);
  }

  public render() {
    const { width, height } = Dimensions.get('window');
    const segments: Segment[] = [
      {
        type: 'ArtworkFront',
        imageUrl: this.props.imageUrl,
        title: this.props.title,
      },
      ...this.props.stories,
    ];

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          blurRadius={20}
          resizeMode="cover"
          source={{ uri: this.props.imageUrl }}
          style={{ flex: 1 }}
        >
          <Carousel
            data={segments}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={width * 0.8}
            itemHeight={height}
            onSnapToItem={index => this.setState({ activeSegmentIndex: index })}
          />
          <Pagination
            dotsLength={segments.length}
            activeDotIndex={this.state.activeSegmentIndex}
            dotColor="rgba(255, 255, 255, 0.9)"
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 10,
              // backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
            inactiveDotColor="rgba(255, 255, 255, 0.5)"
          />
        </ImageBackground>
      </View>
    );
  }

  private renderFrontSegment() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: this.props.imageUrl }}
          style={{ flex: 2 }}
          resizeMode="cover"
        />
        <View
          style={{
            flex: 1,
            padding: 10,
            justifyContent: 'space-around',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>
              {this.props.title}. {this.props.releaseYear}
            </Text>
            <Text style={{}}>
              {this.props.artistName}, {this.props.artistNationality}
            </Text>
          </View>
          <Text>Swipe to begin.</Text>
        </View>
      </View>
    );
  }

  private renderSegment(segment: IStorySegment) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            width: '90%',
            borderBottomWidth: 1,
            borderBottomColor: '#888',
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>{this.props.title}</Text>{' '}
            {this.props.releaseYear}
          </Text>
          <Text style={{ fontSize: 14 }}>By {this.props.artistName}</Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Text>{segment.text}</Text>
        </View>
      </View>
    );
  }

  private renderItem({ item, index }: { item: Segment; index: number }) {
    const { height } = Dimensions.get('screen');
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View
          style={{
            backgroundColor: 'white',
            minHeight: height * 0.6,
            borderRadius: 5,
          }}
        >
          {'type' in item
            ? this.renderFrontSegment()
            : this.renderSegment(item)}
        </View>
      </View>
    );
  }
}
