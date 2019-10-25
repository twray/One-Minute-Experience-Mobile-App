import { createAppContainer, createStackNavigator } from 'react-navigation';

import CameraScreen from './CameraScreen';
import StoryModalScreen from './StoryModalScreen';

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
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);
