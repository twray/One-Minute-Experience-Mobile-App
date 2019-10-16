/* tslint:disable */

import {
  getAPIEndpoint,
  getCustomVisionKeys
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
    [{ resize: { width: 1000 } }],
    {
      compress: 0.8,
      format: 'jpeg',
      base64: false,
    },
  );
}

export async function recognizeImage(
  imageUri: string,
): Promise<PredictionResult> {

  console.log('recognising image: ');

  const formBody = new FormData();
  formBody.append('file', {
    uri: imageUri,
    name: 'image.jpeg',
    type: 'image/jpeg',
  });

  const customVisionKeys = getCustomVisionKeys();

  // const url = `https://northeurope.api.cognitive.microsoft.com/customvision/v3.0/Prediction/6a61c57a-8da9-469a-a5a1-de1055543a42/classify/iterations/production/image`;
  const url = `${customVisionKeys.endpoint}/customvision/v3.0/Prediction/${customVisionKeys.apiKey}/classify/iterations/${customVisionKeys.iteration}/image`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Prediction-Key': 'a267e2c8185241e4808534c70f96157f',
      'Content-Type': 'application/octet-stream'
    },
    body: formBody
  })
    .then(response => response.json())
    .then(result => console.log(result));

  return {
    artworkRecognized: false
  }

  /*
  const response = await fetch(
    // 'http://43710c3b.ngrok.io/api/artwork/recognize',
    'http://modgift.itu.dk:8080/api/artwork/recognize',
    {
      method: 'POST',
      body: formBody,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  console.log('response: ' + response);
  if (response.status !== 200) {
    return {
      success: false,
    };
  }
  const x = await response.json();

  return {
    success: true,
    artwork: x,
  };
  */
  // return (await response.json()) as IArtwork;
}

export async function getArtwork(id: number): IArtwork {

  // TODO: Add Error Handling for Network Requests / Invalid ID
  try {

    const response = await fetch(`${getAPIEndpoint().db}/items/artwork/${id}?fields=*,image.*`);
    const result = await response.json();

    const stories: IStorySegment[] = [
      {id: 1, text: result.data.story_segment_1},
      {id: 1, text: result.data.story_segment_2},
      {id: 1, text: result.data.story_segment_3},
      {id: 1, text: result.data.story_segment_4},
      {id: 1, text: result.data.story_segment_5}
    ];

    const artwork: IArtwork = {
      id: result.data.id,
      title: result.data.title,
      artist_name: result.data.artist_name,
      artist_nationality: result.data.artist_nationality,
      year: result.data.year,
      image_url: result.data.image.data.full_url,
      stories: stories
    };

    return artwork;

  } catch(e) {

    throw new Error('Unable to get artwork of ID: ' + id);

  }

}
