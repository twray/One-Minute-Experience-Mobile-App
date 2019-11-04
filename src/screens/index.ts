import { createAppContainer, createStackNavigator } from 'react-navigation';

import CameraScreen from './CameraScreen';
import StoryModalScreen from './StoryModalScreen';
import StorySelectorScreen from './StorySelectorScreen';
import InfoScreen from './InfoScreen';

const MainStack = createStackNavigator(
  {
    Camera: { screen: CameraScreen }
  },
  {
    initialRouteName: 'Camera',
  },
);

const RootStack = createStackNavigator(
  {
    Main: { screen: MainStack },
    StoryModal: { screen: StoryModalScreen },
    StorySelector: { screen: StorySelectorScreen },
    InfoScreen: { screen: InfoScreen }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);
