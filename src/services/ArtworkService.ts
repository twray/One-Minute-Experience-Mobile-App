/* tslint:disable */

import {
  getAPIEndpoint,
  getKeys
} from '../environment';
import * as ImageManipulator from 'expo-image-manipulator';

export interface IStorySegment {
  readonly id: number;
  readonly text: string;
}

export interface IArtwork {
  readonly id: number;
  readonly title: string;
  readonly artist_name: string;
  readonly artist_nationality: string;
  readonly year: number;
  readonly image_url: string;
  readonly stories: IStorySegment[];
}

export interface PredictionResult {
  success: boolean;
  artwork?: IArtwork;
}

export async function compressAndFormatImage(imageUri: string) {
  return await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 500 } }],
    {
      compress: 0.8,
      format: 'jpeg',
      base64: false,
    },
  );
}

export async function recognizeImage(image): Promise<PredictionResult> {

  const formBody = new FormData();
  formBody.append('file', {
    uri: image.uri,
    name: 'image',
    type: 'image/jpeg',
  });

  const customVisionKeys = getKeys();

  const url = customVisionKeys.endpoint
    + '/customvision/v3.0/Prediction/'
    + customVisionKeys.projectKey
    + '/classify/iterations/' + customVisionKeys.iteration + '/image';

  try {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Prediction-Key': 'a267e2c8185241e4808534c70f96157f',
        'Content-Type': 'multipart/form-data'
      },
      body: formBody
    });
    const result = await response.json();

    const predictedResult = result.predictions && result.predictions[0];

    if (predictedResult && predictedResult.probability > 0.8) {

      const artwork = await getArtworkByTagId(predictedResult.tagId);

      if (artwork) {

        return {
          artworkRecognized: true,
          artwork
        }

      } else {
        return {
          artworkRecognized: false
        }
      }


    } else {
      return {
        artworkRecognized: false
      }
    }

  } catch (e) {
    console.log('An error occurred while contacting the image recognition service.');
    console.log(e);
    throw e;
  }

}

export async function getArtworkById(id: number): IArtwork {

  try {

    const response = await fetch(`${getAPIEndpoint().db}/items/${getKeys().collection}/${id}?fields=*,image.*`);
    const result = await response.json();

    return processArtworkData(result.data);

  } catch(e) {

    console.log('Unable to load artwork information');
    console.log(e);

  }

}

async function getArtworkByTagId(tagId: string): IArtwork {

  try {

    const response = await fetch(`${getAPIEndpoint().db}/items/${getKeys().collection}?filter[image_recognition_tag_id]=${tagId}&fields=*,image.*`);
    const result = await response.json();

    if (result.data[0]) {
      return processArtworkData(result.data[0]);
    } else {
      return null;
    }

  } catch(e) {

    console.log('Unable to load artwork information');
    console.log(e);
    throw e;
  }

}

function processArtworkData(data): IArtwork {

  const stories: IStorySegment[] = [
    {id: 1, text: data.story_segment_1},
    {id: 1, text: data.story_segment_2},
    {id: 1, text: data.story_segment_3},
    {id: 1, text: data.story_segment_4},
    {id: 1, text: data.story_segment_5}
  ];

  const artwork: IArtwork = {
    id: data.id,
    title: data.title,
    artist_name: data.artist_name,
    artist_nationality: data.artist_nationality,
    year: data.year,
    image_url: data.image.data.full_url,
    stories: stories
  };

  return artwork;

}
