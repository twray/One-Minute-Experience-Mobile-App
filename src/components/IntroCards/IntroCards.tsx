import * as React from 'react';
import {
  View,
  Animated,
  Dimensions,
  Text,
  Image
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import styles, { introCardHeight } from './styles';

const AppIcon = require('../../assets/images/icon.png');

interface IIntroSegment {
  readonly image;
  readonly title?: string;
  readonly text?: string;
  readonly bottom_text: string;
  readonly transparent: boolean;
}

const IntroSegments: IntroSegments[] = [
  {
    text: 'This is a simple companion that offers short stories about objects in this museum.'
  },
  {
    text: 'These stories are presented as bite-sized pieces, just like what you see here.'
  },
  {
    text: 'They might tell you something interesting, or perhaps encourage you to look a little closer.'
  },
  {
    text: 'Some of the objects in this museum have stories. Feel free to find them.',
    bottom_text: 'Tap this button to scan an object and read its story.',
    transparent: true
  }
];

export default class IntroCards extends React.Component {

  render() {
    const { width } = Dimensions.get('screen');
    return (
      <Animated.View style={styles.IntroCardsContainer}>
        <Carousel
          data={IntroSegments}
          renderItem={({item}) => <IntroCard {...item} />}
          sliderWidth={width}
          itemWidth={width * 0.8}
          itemHeight={introCardHeight}
          useScrollView={true}
          onSnapToItem={(index: number) => {
            this.setState({ activeSegmentIndex: index });
          }}
        />
      </Animated.View>
    )
  }

}

class IntroCard extends React.Component {

  render() {
    const {
      title,
      text,
      image,
      bottom_text,
      transparent
    } = this.props;
    return (
      <View style={styles.IntroCardContainer}>
        { (title || text || image) &&
          <View style={transparent ? styles.IntroCardTransparent : styles.IntroCard}>
            {image && <Image source={image} style={styles.Icon} />}
            {title && <Text style={transparent ? styles.TextViewOnCameraView : styles.TextViewBold}>{title}</Text>}
            {text && <Text style={transparent ? styles.TextViewOnCameraView : styles.TextView}>{text}</Text>}
          </View>
        }
        <View style={styles.BottomTextContainer}>
          {bottom_text && <Text style={transparent ? styles.TextViewOnCameraView : styles.TextViewOnCameraView}>{bottom_text}</Text>}
        </View>
      </View>
    )
  }

}
