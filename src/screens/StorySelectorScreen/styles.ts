import { StyleSheet } from 'react-native';

import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30 + Constants.statusBarHeight,
    alignItems: 'center',
    flexDirection: 'column'
  },
  closeButtonContainer: {
    position: 'absolute',
    zIndex: 10,
    top: 20 + Constants.statusBarHeight,
    right: 20
  },
  Heading: {
    fontFamily: 'SFCompact-Medium',
    fontSize: 24,
    lineHeight: 32,
    marginTop: 30,
    marginBottom: 15,
    color: '#444444'
  },
  BodyText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SFCompact-Light',
    marginBottom: 15,
    color: '#444444'
  },
  StorySelectorHeadingWrapper: {
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  NameAndNationality: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SFCompact-Light',
    color: '#9A7049'
  },
  MediumText: {
    fontFamily: 'SFCompact-Medium'
  },
  LightText: {
    fontFamily: 'SFCompact-Light'
  },
  HrWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  Hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    width: '100%',
  },
  ChooseYourStoryText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20,
    color: '#999999',
    marginTop: 10,
    marginBottom : 20,
    fontFamily: 'SFCompact-Medium'
  },
  StorySelectorBodyWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#EEEEEE',
  },
  StorySelectorScrollViewVerticalPadding: {
    width: '100%',
    height: 20
  },
  StoryCard: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: '10%',
    marginRight: '10%',
    width: '80%',
    height: 300,
    backgroundColor: '#EFE6E7',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  StoryCardText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SFCompact-Medium',
    lineHeight: 28,
    color: '#2B2D3C',
    width: '80%'
  },
  FullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
