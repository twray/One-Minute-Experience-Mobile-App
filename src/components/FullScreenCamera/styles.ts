import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';

const cameraButtonSize = 74;

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

  innerCameraButton: {
    width: cameraButtonSize - 20,
    height: cameraButtonSize - 20,
    borderRadius: cameraButtonSize / 2,
    borderWidth: 4,
    borderColor: '#444444',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    margin: 10,
  },

  outerCameraButton: {
    width: cameraButtonSize,
    height: cameraButtonSize,
    borderRadius: cameraButtonSize / 2,
    backgroundColor: 'rgb(255, 255, 255)',
    marginBottom: 20,
  },
});
