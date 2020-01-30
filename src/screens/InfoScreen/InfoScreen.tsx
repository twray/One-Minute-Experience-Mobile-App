import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';

import config from '../../config/config';
import Constants from 'expo-constants';
import styles from './styles';

const appVersion = Constants.manifest.version;

const InfoScreen: React.FC<NavigationScreenProps> = props => (
  <View style={styles.container}>
    <View style={styles.closeButtonContainer}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <AntDesign name="close" color="#444444" size={30} />
      </TouchableOpacity>
    </View>
    <ScrollView>
      {config.dialog.infoScreen}
      <Text style={styles.BodyText}>
        App version: {appVersion}
      </Text>
    </ScrollView>
  </View>
);

export default InfoScreen;
