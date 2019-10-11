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
              {artwork.artist_name}, {artwork.artist_nationality}
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
