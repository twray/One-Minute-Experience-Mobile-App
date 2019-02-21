import { StyleSheet, Platform } from 'react-native';
import { Constants } from 'expo';

const cameraButtonSize = 80;

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  cameraButton: {
    width: cameraButtonSize,
    height: cameraButtonSize,
    borderRadius: cameraButtonSize / 2,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 10,
  },
});
