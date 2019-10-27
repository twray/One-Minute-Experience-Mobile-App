import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('screen');
const { statusBarHeight } = Constants;

export const introCardHeight = 320;

export default StyleSheet.create({
  IntroCardsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  CarouselContainer: {
    width: '100%',
    height: '100%',
    paddingBottom: 120,
  },
  IntroCardContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  IntroCard: {
    height: introCardHeight,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFE6E7',
    borderRadius: 12
  },
  IntroCardTransparent: {
    height: introCardHeight,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderStyle: 'dashed'
  },
  BottomTextContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'column-reverse',
    width: '100%'
  },
  Icon: {
    width: 90,
    height: 90,
    marginBottom: 30
  },
  TextView: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SFCompact-Medium',
    lineHeight: 28,
    marginBottom: 15,
    color: '#2B2D3C'
  },
  TextViewBold: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SFCompact-Medium',
    lineHeight: 28,
    marginBottom: 15
  },
  TextViewOnCameraView: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SFCompact-Medium',
    lineHeight: 28,
    color: '#FFFFFF'
  }
});
