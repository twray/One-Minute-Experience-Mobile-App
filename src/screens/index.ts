import { createAppContainer, createStackNavigator } from 'react-navigation';

import CameraScreen from './CameraScreen';
import FavoritesScreen from './FavoritesScreen';
import StoryModalScreen from './StoryModalScreen';

const MainStack = createStackNavigator(
  {
    Camera: { screen: CameraScreen },
    Favorites: { screen: FavoritesScreen },
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
