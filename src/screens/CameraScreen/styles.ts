import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaView: {
    position: 'absolute',
    backgroundColor: '#e84118',
    width: '100%',
  },
  safeText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 10 + Constants.statusBarHeight,
    padding: 10,
    fontSize: 16,
  },
});
