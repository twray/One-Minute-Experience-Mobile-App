import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import { IStorySegment, IArtwork } from '../../services/ArtworkService';
import styles from './styles';

interface GeneralStorySegmentProps {
  artwork: IArtwork;
  children: any;
}

const GeneralStorySegment = ({
  artwork,
  children,
}: GeneralStorySegmentProps) => {

  let nameAndNationality = [];

  if (artwork.artist_name) {
    nameAndNationality.push(artwork.artist_name);
  }
  if (artwork.artist_nationality) {
    nameAndNationality.push(artwork.artist_nationality);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.Card}>
        <View style={styles.CardContainer}>
          <View style={styles.CardHeader}>
            <Text style={styles.CardTextHeadingWrapper}>
              <Text style={styles.MediumText}>{artwork.title}</Text>
              <Text> </Text>
              <Text style={styles.LightText}>{artwork.year}</Text>
            </Text>
            <Text style={styles.NameAndNationality}>
              {nameAndNationality.join(', ')}
            </Text>
          </View>
          <View style={styles.HrWrapper}>
            <View style={styles.Hr} />
          </View>
          {children}
        </View>
      </View>
    </View>
  );
};

export default GeneralStorySegment;
