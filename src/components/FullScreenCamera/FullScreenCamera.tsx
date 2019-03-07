import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { Camera, Permissions, CameraObject, ImageManipulator } from 'expo';

import styles from './styles';

const computeRatio = (ratioStr: string) => {
  const [h, w] = ratioStr.split(':');
  return parseFloat(h) / parseFloat(w);
};

interface CameraState {
  hasCameraPermission: boolean;
  ratio: string | undefined;
  takingPicture: boolean;
}
interface CameraProps {
  onPictureTaken: (imageData: ImageManipulator.ImageResult) => void;
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
    };

    this.takePicture = this.takePicture.bind(this);
    this.prepareRatio = this.prepareRatio.bind(this);
  }

  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  public render() {
    const { hasCameraPermission, ratio, takingPicture } = this.state;
    if (!hasCameraPermission) {
      return <Text>Permission to camera not granted</Text>;
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
              <View style={styles.cameraButton} />
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
    // take a picture
    if (!this.camera.current) return;
    const picture = await this.camera.current.takePictureAsync({ base64: true });
    // resize and lower quality
    const resizedImage = await ImageManipulator.manipulateAsync(
      picture.uri,
      [{ resize: { width: 1000 } }],
      {
        compress: 0.8,
        format: 'jpeg',
        base64: true,
      },
    );
    this.props.onPictureTaken(resizedImage);
    this.setState({ takingPicture: false });
  }
}
