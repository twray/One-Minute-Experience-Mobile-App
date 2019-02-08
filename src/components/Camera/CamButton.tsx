import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export interface CamButtonProps {
  press: () => void;
}

export default class CamButton extends React.Component<CamButtonProps, any> {
  private style = StyleSheet.create({
    button:{
      borderRadius:50,
      borderWidth: 6,
      borderColor: 'white',
      backgroundColor:'#dddddd',
      height:75,
      width:75,
      marginBottom: 25,
    },
  });

  constructor(props: CamButtonProps) {
    super(props);
  }

  public render() {
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          flex: 1,
          alignSelf: 'flex-end',
          alignItems: 'center',
        }}
        onPress={this.props.press}>
        <View style={this.style.button}>
        </View>
      </TouchableOpacity>
    );
  }
}
