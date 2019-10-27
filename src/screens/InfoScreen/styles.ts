import { StyleSheet } from 'react-native';

import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 30 + Constants.statusBarHeight,
    height: 500
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
  LinkText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SFCompact-Light',
    marginBottom: 15,
    color: '#0D9DE6'
  }
});
