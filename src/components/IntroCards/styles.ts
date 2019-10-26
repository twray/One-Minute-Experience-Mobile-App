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
    width: width,
    top: (height - introCardHeight) / 2,
    height: height - ((height - introCardHeight) / 2) - 110
  },
  IntroCardContainer: {
    height: height - ((height - introCardHeight) / 2) - 110
  },
  IntroCard: {
    height: Math.min(introCardHeight, height - statusBarHeight - 110),
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFE6E7',
    borderRadius: 12
  },
  IntroCardTransparent: {
    height: Math.min(introCardHeight, height - statusBarHeight - 110),
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderStyle: 'dashed'
  },
  BottomTextContainer: {
    flex: 1,
    flexDirection: 'column-reverse'
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
