import * as React from 'react';

import AppContainer from './screens';
import { Font } from 'expo';
import { View } from 'react-native';

interface AppState {
  isLoading: boolean;
}

export default class App extends React.Component<{}, AppState> {
  public readonly state = {
    isLoading: true,
  };

  // load font used throughout the app
  public async componentDidMount() {
    await Font.loadAsync({
      'SFCompact-Light': require('./assets/fonts/SF-Compact-Text-Light.otf'),
      'SFCompact-Medium': require('./assets/fonts/SF-Compact-Text-Medium.otf'),
    });
    this.setState({ isLoading: false });
  }

  public render() {
    if (this.state.isLoading) return <View />;
    return <AppContainer />;
  }
}
