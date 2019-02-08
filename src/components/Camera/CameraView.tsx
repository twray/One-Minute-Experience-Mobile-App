import * as React from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, Platform } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import CamButton from './CamButton';

interface cameraState{
  hasCameraPermission: boolean;
  type: string;
}
interface cameraProps{

}

export default class CameraView extends React.Component<cameraProps,cameraState> {
  private readonly camera: React.RefObject<Camera>;

  constructor(props: any) {
    super(props);
    this.state = {
      hasCameraPermission: false,
      type: Camera.Constants.Type.back,
    };

    this.switchState = this.switchState.bind(this);
    this.getRatio = this.getRatio.bind(this);
    this.camera = React.createRef();
  }

  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

  }

  public render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }}
                  type={this.state.type}
                  ref={this.camera}
                  ratio={this.getRatio()}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
            <CamButton press={this.switchState}/>
            </View>
          </Camera>
        </View>
      );
    }
  }

  private async getRatio() {
    if (Platform.OS === 'ios') {
      return '';
    }
    const ratios = await this.camera.getSupportedRatiosAsync();
    return ratios.ratio[0];
  }

  private async switchState() {
    const options = { quality: 1, base64: true, fixOrientation: true, exif: true };
    const photo = await this.camera.takePictureAsync(options); // uri, width, height, exif, base64
  }
}
