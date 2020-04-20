import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CameraScreen from './CameraScreen';
import StoryModalScreen from './StoryModalScreen';
import StorySelectorScreen from './StorySelectorScreen';
import InfoScreen from './InfoScreen';
import { IArtwork } from '../services/ArtworkService';

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Camera" headerMode="none">
    <Stack.Screen
      name="Camera"
      component={CameraScreen}
    />
  </Stack.Navigator>
);

export type RootStackParamList = {
  Main: undefined,
  StoryModal: { artwork: IArtwork },
  StorySelector: { artworks: IArtwork[] },
  Info: undefined
  Camera: undefined
};

const RootStackNavigator = createStackNavigator<RootStackParamList>();

const RootStack = () => (
  <RootStackNavigator.Navigator mode="modal" headerMode="none">
    <RootStackNavigator.Screen
      name="Main"
      component={MainStack}
    />
    <RootStackNavigator.Screen
      name="StoryModal"
      component={StoryModalScreen}
    />
    <RootStackNavigator.Screen
      name="StorySelector"
      component={StorySelectorScreen}
    />
    <RootStackNavigator.Screen
      name="Info"
      component={InfoScreen}
    />
  </RootStackNavigator.Navigator>
);

const AppContainer = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
);

export default AppContainer;
