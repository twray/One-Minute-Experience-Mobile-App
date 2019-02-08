import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import styles from '../styles';
import StorySegment from '../components/StorySegment';

interface StoryModalScreenProps extends NavigationScreenProps {}

export default class StoryModalScreen extends React.Component<
  StoryModalScreenProps,
  {}
> {
  constructor(props: StoryModalScreenProps) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.fullCenterView}>
        <Text>Mona Lisa, Good ol' Leo, 1993</Text>
        <StorySegment text="Hello i segment" />
        <Button
          title="Dismiss"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
