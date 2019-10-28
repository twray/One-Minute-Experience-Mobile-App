import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { CameraObject } from 'expo';
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions';

import styles from './styles';

const computeRatio = (ratioStr: string) => {
  const [h, w] = ratioStr.split(':');
  return parseFloat(h) / parseFloat(w);
};

interface CameraState {
  hasCameraPermission: boolean;
  ratio: string | undefined;
  takingPicture: boolean;
  permissionHasBeenAsked: boolean;
}

interface CameraProps {
  onPictureTaken: (imageUri: string) => void;
  setLoading: (value: boolean) => void;
}

export default class FullScreenCamera extends React.Component<
  CameraProps,
  CameraState
> {
  private readonly camera: React.RefObject<CameraObject> = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      takingPicture: false,
      ratio: undefined,
      hasCameraPermission: false,
      permissionHasBeenAsked: false
    };

    this.takePicture = this.takePicture.bind(this);
    this.prepareRatio = this.prepareRatio.bind(this);
  }

  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
      permissionHasBeenAsked: true
    });
  }

  public render() {

    const { hasCameraPermission, permissionHasBeenAsked, ratio, takingPicture } = this.state;
    if (!hasCameraPermission && permissionHasBeenAsked) {
      return (
        <View style={styles.permissionsMessageContainer}>
          <Text style={styles.permissionsMessage}>
            This app uses image recognition to identify the artworks you see in the museum. Therefore, it requires access to your phone's camera.
          </Text>
          <Text style={styles.permissionsMessage}>
            You can enable camera access by changing the permission settings on your phone.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          ref={this.camera as any}
          ratio={ratio}
          onCameraReady={this.prepareRatio}
        >
          <SafeAreaView style={styles.innerContainer}>
            <TouchableOpacity
              onPress={this.takePicture}
              disabled={takingPicture}
            >
              <View style={styles.outerCameraButton}>
                <View style={styles.innerCameraButton} />
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </Camera>
      </View>
    );
  }

  private async prepareRatio() {
    if (Platform.OS === 'android' && this.camera.current) {
      const { width, height } = Dimensions.get('screen');
      const screenRatio = height / width;
      const ratios = await this.camera.current.getSupportedRatiosAsync();
      const ratio = ratios.reduce((prev, curr, index) => {
        const currRatio = computeRatio(curr);
        const prevRatio = computeRatio(prev);
        return Math.abs(currRatio - screenRatio) <
          Math.abs(prevRatio - screenRatio)
          ? curr
          : prev;
      });
      this.setState({ ratio });
    }
  }

  private async takePicture() {
    this.props.setLoading(true);
    await this.setState({ takingPicture: true });
    if (!this.camera.current) return;
    const picture = await this.camera.current.takePictureAsync({
      base64: true,
    });
    this.props.onPictureTaken(picture.uri);
    this.setState({ takingPicture: false });
  }
}
