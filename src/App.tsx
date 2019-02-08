import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <View style={styles.mainView}>
        <Text>1 Minute Experience</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
