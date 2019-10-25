import { StyleSheet, Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { height } = Dimensions.get('screen');
const { statusBarHeight } = Constants;

export default StyleSheet.create({
  Card: {
    backgroundColor: '#FFFFFF',
    height: Math.min(500, height - statusBarHeight - 100)
  },
  CardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  CardHeader: {
    flex: 2,
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '80%',
  },
  CardTextHeadingWrapper: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  MediumText: {
    fontFamily: 'SFCompact-Medium'
  },
  LightText: {
    fontFamily: 'SFCompact-Light'
  },
  NameAndNationality: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SFCompact-Light',
  },
  FullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  ArtworkStory: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  HrWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  Hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    width: '33%',
  },
  PaginationDots: {
    width: 11,
    height: 11,
    borderRadius: 5,
    marginHorizontal: 0
  },
  TextWrapper: {
    flex: 4,
    width: '80%'
  },
  TextView: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SFCompact-Light',
    lineHeight: 28
  },
  ImageStyle: {
    flex: 1,
    resizeMode: 'cover',
  },
  ImageView: {
    flex: 4,
    overflow: 'hidden'
  },
  ViewBoxContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  CarouselContainer: {
    flex: 1,
    marginBottom: 30,
    marginTop: 70 + statusBarHeight
  },
});
