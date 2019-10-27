import * as React from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  Text,
  Image,
  Platform
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Constants from 'expo-constants';

import styles from './styles';

interface IntroSegment {
  readonly text?: string;
  readonly image_url?: string;
  readonly title?: string;
  readonly bottom_text?: string;
  readonly transparent?: boolean;
}

const IntroSegments: IntroSegment[] = [ {
    text: 'One Minute a simple companion that offers short stories about objects in this museum.'
  }, {
    text: 'These stories are presented in bite-sized pieces, just like what you see here.'
  }, {
    text: 'They might tell you something interesting, or perhaps encourage you to look a little closer.'
  }, {
    text: 'Tap the button below to scan an object and read its story.',
    transparent: true
  }];

export default class IntroCards extends React.Component {

  render() {
    const { width } = Dimensions.get('window');
    const statusBarOffset = Platform.OS === "android" ? {paddingTop: Constants.statusBarHeight} : {}
    return (
      <SafeAreaView style={styles.IntroCardsContainer}>
        <View style={styles.CarouselContainer}>
          <Carousel
            data={IntroSegments}
            renderItem={({item}) => <IntroCard {...item} />}
            sliderWidth={width}
            itemWidth={width * 0.8}
            useScrollView={true}
            onSnapToItem={(index: number) => {
              this.setState({ activeSegmentIndex: index });
            }}
          />
        </View>
      </SafeAreaView>
    )
  }

}

class IntroCard extends React.Component<IntroSegment> {

  render() {
    const {
      title,
      text,
      bottom_text,
      transparent,
      image_url
    } = this.props;
    return (
      <View style={styles.IntroCardContainer}>
        { (title || text || image_url) &&
          <View style={transparent ? styles.IntroCardTransparent : styles.IntroCard}>
            {image_url && <Image source={{uri: image_url}} style={styles.Icon} />}
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
