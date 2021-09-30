import React from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { CameraType, FlashMode } from 'expo-camera/build/Camera.types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';

import styles from './camera.toolbar.styles';

export interface CameraToolbarProps {
  capturing: boolean;
  cameraType: CameraType;
  flashMode: FlashMode;
  setFlashMode?: (flashMode: FlashMode) => void;
  setCameraType?: (cameraType: CameraType) => void;
  onCaptureIn?: (event: GestureResponderEvent) => void;
  onCaptureOut?: (event: GestureResponderEvent) => void;
  onShortCapture?: (event: GestureResponderEvent) => void;
  onLongCapture?: (event: GestureResponderEvent) => void;
}

function CameraToolbar(props: CameraToolbarProps) {
  return (
    <Grid style={styles.bottomToolbar}>
      <Row>
        <Col style={styles.alignCenter}>
          <TouchableOpacity onPress={() => props.setFlashMode?.(props.flashMode === FlashMode.on ? FlashMode.off : FlashMode.on)}>
            <Ionicons name={props.flashMode === FlashMode.on ? 'md-flash' : 'md-flash-off'} color="white" size={30} />
          </TouchableOpacity>
        </Col>
        <Col size={2} style={styles.alignCenter}>
          <TouchableWithoutFeedback
            onPressIn={props.onCaptureIn}
            onPressOut={props.onCaptureOut}
            onLongPress={props.onLongCapture}
            onPress={props.onShortCapture}
          >
            <View style={[styles.captureBtn, props.capturing && styles.captureBtnActive]}>{props.capturing && <View style={styles.captureBtnInternal} />}</View>
          </TouchableWithoutFeedback>
        </Col>
        <Col style={styles.alignCenter}>
          <TouchableOpacity onPress={() => {
            props.setCameraType?.(props.cameraType === CameraType.back ? CameraType.front : CameraType.back);
          }}>
            <Ionicons name="camera-reverse" color="white" size={30} />
          </TouchableOpacity>
        </Col>
      </Row>
    </Grid>
  );
}

CameraToolbar.defaultProps = {
  capturing: false,
  cameraType: CameraType.back,
  flashMode: FlashMode.off,
};

export default CameraToolbar;
