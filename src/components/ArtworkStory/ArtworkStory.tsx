import * as React from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableHighlightBase,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import StorySegment from './StorySegment';
import { IArtwork, IStorySegment } from '../../services/ArtworkService';

interface ArtworkStoryProps extends IArtwork {}

interface ArtworkStoryState {
  activeSegmentIndex: number;
  backgroundOpacity: Animated.Value;
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
  private readonly carousel: React.RefObject<Carousel<IStorySegment>>;

  constructor(props: ArtworkStoryProps) {
    super(props);
    this.state = {
      activeSegmentIndex: 0,
      backgroundOpacity: new Animated.Value(0),
    };
    this.carousel = React.createRef();
    this.renderItem = this.renderItem.bind(this);
    this.renderHeading = this.renderHeading.bind(this);
    this.getActiveDotColor = this.getActiveDotColor.bind(this);
    this.getInactiveDotColor = this.getInactiveDotColor.bind(this);
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
      <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: this.state.backgroundOpacity,
          }}
        >
          <ImageBackground
            blurRadius={20}
            resizeMode="cover"
            source={{ uri: this.props.imageUrl }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </Animated.View>
        {/* </ImageBackground> */}

        <View style={{ flex: 1, marginBottom: 100, marginTop: 100 }}>
          <Carousel
            data={segments}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={width * 0.8}
            itemHeight={height}
            onSnapToItem={(index: number) => {
              this.setState({ activeSegmentIndex: index });
              const opacity = index === 0 ? 0 : 1;
              Animated.timing(this.state.backgroundOpacity, {
                toValue: opacity,
                duration: 200,
              }).start();
            }}
          />
          <Pagination
            dotsLength={segments.length}
            activeDotIndex={this.state.activeSegmentIndex}
            dotColor={this.getActiveDotColor()}
            dotStyle={{
              width: 11,
              height: 11,
              borderRadius: 5,
              marginHorizontal: 0,
            }}
            inactiveDotOpacity={1.0}
            inactiveDotScale={1.0}
            inactiveDotColor={this.getInactiveDotColor()}
          />
        </View>
      </View>
    );
  }

  private renderHeading() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 2,
            marginTop: 35,
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 23, textAlign: 'center' }}>
            <Text
              style={{
                fontFamily: 'SFCompact-Medium',
                textTransform: 'uppercase',
              }}
            >
              {this.props.title}
            </Text>
            <Text> </Text>
            <Text
              style={{
                fontFamily: 'SFCompact-Light',
              }}
            >
              {this.props.releaseYear}
            </Text>
          </Text>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 15,
              fontSize: 19,
              fontFamily: 'SFCompact-Light',
            }}
          >
            {this.props.artistName}, {this.props.artistNationality}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              width: '33%',
            }}
          />
        </View>
      </View>
    );
  }

  private renderFrontSegment() {
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={{ flex: 3 }}>{this.renderHeading()}</View> */}
        <View
          style={{
            flex: 2,
            marginTop: 35,
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 23, textAlign: 'center' }}>
            <Text
              style={{
                fontFamily: 'SFCompact-Medium',
                textTransform: 'uppercase',
              }}
            >
              {this.props.title}
            </Text>
            <Text> </Text>
            <Text
              style={{
                fontFamily: 'SFCompact-Light',
              }}
            >
              {this.props.releaseYear}
            </Text>
          </Text>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 15,
              fontSize: 19,
              fontFamily: 'SFCompact-Light',
            }}
          >
            {this.props.artistName}, {this.props.artistNationality}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              width: '33%',
            }}
          />
        </View>
        <View style={{ flex: 4, overflow: 'hidden' }}>
          <Image
            source={{ uri: this.props.imageUrl }}
            style={{
              flex: 1,
              resizeMode: 'cover',
            }}
          />
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
          padding: 10,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 2,
            marginTop: 35,
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 23,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            <Text style={{ fontFamily: 'SFCompact-Medium' }}>
              {this.props.title}
            </Text>
            <Text> </Text>
            <Text style={{ fontFamily: 'SFCompact-Light' }}>
              {this.props.releaseYear}
            </Text>
          </Text>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 15,
              fontSize: 19,
              fontFamily: 'SFCompact-Light',
            }}
          >
            {this.props.artistName}, {this.props.artistNationality}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              width: '33%',
            }}
          />
        </View>
        <View style={{ flex: 4, width: '90%' }}>
          <ScrollView style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 19,
                textAlign: 'center',
                fontFamily: 'SFCompact-Light',
              }}
            >
              {segment.text}
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }

  private renderItem({ item }: { item: Segment; index: number }) {
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

  private getActiveDotColor(): string {
    if (this.state.activeSegmentIndex === 0) return '#80A1C1';
    return 'rgba(0, 0, 0, 0.7)';
  }

  private getInactiveDotColor(): string {
    if (this.state.activeSegmentIndex === 0) return 'rgba(0, 0, 0, 0.7)';
    return '#FCFCFC';
  }
}
