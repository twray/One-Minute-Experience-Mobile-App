import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Camera, Permissions, CameraObject, ImageManipulator } from 'expo';

interface CameraState {
  hasCameraPermission: boolean;
  ratio: string | undefined;
  takingPicture: boolean;
}
interface CameraProps {
  onPictureTaken: (imageData: string) => void;
}

export default class CameraView extends React.Component<
  CameraProps,
  CameraState
> {
  private camera: React.RefObject<CameraObject> = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      takingPicture: false,
      ratio: undefined,
      hasCameraPermission: false,
    };

    this.takePicture = this.takePicture.bind(this);
  }

  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const ratio = await this.getBestRatio();
    this.setState({ ratio, hasCameraPermission: status === 'granted' });
  }

  public render() {
    const { hasCameraPermission, ratio, takingPicture } = this.state;
    if (!hasCameraPermission) {
      return <Text>Permission to camera not granted</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} ref={this.camera as any} ratio={ratio}>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={this.takePicture}
              disabled={takingPicture}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  borderWidth: 3,
                  borderColor: 'white',
                  marginBottom: 10,
                }}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </Camera>
      </View>
    );
  }

  private async takePicture() {
    await this.setState({ takingPicture: true });
    // take a picture
    if (!this.camera.current) return;
    const picture = await this.camera.current.takePictureAsync();
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
    this.props.onPictureTaken(resizedImage.base64!);
    this.setState({ takingPicture: false });
  }

  private async getBestRatio() {
    if (Platform.OS === 'ios' || !this.camera.current) return undefined;
    const ratios = await this.camera.current.getSupportedRatiosAsync();
    if (ratios.length === 0) return undefined;
    return ratios[0];
  }
}
