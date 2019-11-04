import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import styles from './styles';
import { IArtwork } from '../../services/ArtworkService';
import { AntDesign } from '@expo/vector-icons';

interface StorySelectorScreenProps extends NavigationScreenProps {}

interface StorySelectorScreenState {
  artwork: IArtwork
  artworks: IArtwork[]
}

export default class StoryModalScreen extends React.Component<
  StorySelectorScreenProps,
  StorySelectorScreenState
> {

  state = {
    artwork: {
      id: 0,
      title: '',
      artist_name: '',
      artist_nationality: '',
      year: 0,
      image_url: '',
      thumbnail_url: '',
      stories: []
    },
    artworks: []
  }

  componentDidMount() {
    this.setState({
      artwork: this.props.navigation.getParam('artworks')[0] || null,
      artworks: this.props.navigation.getParam('artworks') || []
    });
  }

  handleOnPress(artwork: IArtwork) {
    this.props.navigation.navigate('StoryModal', {
      artwork
    });
  }

  render() {

    const { artwork, artworks } = this.state;

    let nameAndNationality = [];

    if (artwork.artist_name) {
      nameAndNationality.push(artwork.artist_name);
    }
    if (artwork.artist_nationality) {
      nameAndNationality.push(artwork.artist_nationality);
    }

    return (
      <View style={styles.container}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="close" color="#444444" size={30} />
          </TouchableOpacity>
        </View>
        {artwork &&
          <React.Fragment>
            <Text style={styles.StorySelectorHeadingWrapper}>
              <Text style={styles.MediumText}>{artwork && artwork.title}</Text>
              <Text> </Text>
              <Text style={styles.LightText}>{artwork && artwork.year}</Text>
            </Text>
            <Text style={styles.NameAndNationality}>
              {nameAndNationality.join(', ')}
            </Text>
            <Text style={styles.ChooseYourStoryText}>
              Choose your story
            </Text>
            <View style={styles.HrWrapper}>
              <View style={styles.Hr} />
            </View>
            <View style={styles.StorySelectorBodyWrapper}>
              {artwork.image_url ?
                <View style={styles.FullScreen}>
                  <ImageBackground
                    blurRadius={20}
                    resizeMode="cover"
                    source={{ uri: artwork.thumbnail_url, cache: 'reload' }}
                    style={styles.FullScreen}
                  />
                </View>
                : null
              }
              <ScrollView>
                <View style={styles.StorySelectorScrollViewVerticalPadding} />
                {artworks.map((artwork: IArtwork) => {
                  return (
                    <TouchableOpacity
                      key={artwork.id} style={styles.StoryCard}
                      onPress={() => this.handleOnPress(artwork)}
                    >
                      <Text style={styles.StoryCardText}>
                        {artwork.stories[0].text} ...
                      </Text>
                    </TouchableOpacity>
                  )
                })}
                <View style={styles.StorySelectorScrollViewVerticalPadding} />
              </ScrollView>
            </View>
          </React.Fragment>
        }
      </View>
    )
  }

}
