import * as React from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import config from '../../config/config';

import IntroSegment from '../../model/IntroSegment';

import styles from './styles';

export default class IntroCards extends React.Component {

  render() {
    const { width } = Dimensions.get('window');
    return (
      <SafeAreaView style={styles.IntroCardsContainer}>
        <View style={styles.CarouselContainer}>
          <Carousel
            data={config.dialog.introCards}
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
