import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { Camera } from 'expo-camera';
import { CameraCapturedPicture, CameraType, FlashMode, VideoCodec } from 'expo-camera/build/Camera.types';
import { Audio } from 'expo-av';

import Toolbar from './camera.toolbar';
import Gallery from './camera.gallery';

import styles from './camera.screen.styles';

export interface CameraProps {
  style?: StyleProp<ViewStyle>;
}

export interface CameraState {
  hasCameraPermission: boolean | null;
  flashMode: FlashMode;
  cameraType: CameraType;
  captures?:
    | Array<CameraCapturedPicture>
    | Array<
        | {
            uri: string;
            codec?: VideoCodec;
          }
        | undefined
      >;
  capturing: boolean;
}

export default class CameraScreen extends React.Component<CameraProps, CameraState> {
  camera: Camera | null = null;

  state = {
    hasCameraPermission: null,
    flashMode: FlashMode.off,
    cameraType: CameraType.back,
    captures: [],
    capturing: false,
  };

  constructor(public props: CameraProps) {
    super(props);
  }

  setFlashMode = (flashMode: FlashMode) => this.setState({ flashMode });
  setCameraType = (cameraType: CameraType) => {
    this.setState({ cameraType });
  };

  handleCaptureIn = () => this.setState({ capturing: true });
  handleCaptureOut = () => {
    if (this.state.capturing) this.camera?.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera?.takePictureAsync();
    this.setState({ capturing: false, captures: [photoData, ...this.state.captures] });
  };
  handleLongCapture = async () => {
    const videoData = await this.camera?.recordAsync();
    this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
  };

  async componentDidMount() {
    const camera = await Camera.requestPermissionsAsync();
    const audio = await Audio.requestPermissionsAsync();
    const hasCameraPermission = camera.status === 'granted' && audio.status === 'granted';

    this.setState({ hasCameraPermission });
  }

  render() {
    const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <View style={this.props?.style}>
        <Camera type={cameraType} flashMode={flashMode} style={styles.preview} ref={(camera) => (this.camera = camera)} />
        {captures.length > 0 && <Gallery captures={captures} />}
        <Toolbar
          flashMode={flashMode}
          cameraType={cameraType}
          capturing={capturing}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onShortCapture={this.handleShortCapture}
          onLongCapture={this.handleLongCapture}
        />
      </View>
    );
  }
}
