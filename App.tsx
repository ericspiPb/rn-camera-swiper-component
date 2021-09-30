import * as React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

import CameraPage from './components/camera/camera.screen';


const { width, height } = Dimensions.get('screen');

function DetailsScreen() {
  return (
    <View
      style={{
        width, height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Swipe Left to Camera Screen</Text>
    </View>
  );
}

function CameraScreen() {
  return (
    <CameraPage
      style={{
        width, height,
      }}
    />
  )
}

export default function App() {
  return (
    <ScrollView horizontal={true} pagingEnabled={true} style={{flex: 1}}>
      <CameraScreen></CameraScreen>
      <DetailsScreen></DetailsScreen>
    </ScrollView>
  )
}
