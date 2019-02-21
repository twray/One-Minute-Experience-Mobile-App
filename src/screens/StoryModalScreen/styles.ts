import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  closeButtonContainer: {
    position: 'absolute',
    zIndex: 10,
    top: 40 + Constants.statusBarHeight,
    right: 20,
  },
});
