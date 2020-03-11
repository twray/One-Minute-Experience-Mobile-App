/* tslint:disable */

import {
  getAPIEndpoint,
  getKeys
} from '../environment';
import config from '../config/config';
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
  readonly thumbnail_url: string;
  readonly stories: IStorySegment[];
}

export interface IArtworkAPIResultData {
  readonly id: number;
  readonly title: string;
  readonly artist_name: string;
  readonly artist_nationality: string;
  readonly year: number;
  readonly story_segment_1: string;
  readonly story_segment_2: string;
  readonly story_segment_3: string;
  readonly story_segment_4: string;
  readonly story_segment_5: string;
  readonly image: IArtworkAPIResultDataImage;
}

export interface IArtworkAPIResultDataImage {
  readonly id: number;
  readonly filename: string;
  readonly data: IArtworkAPIResultDataImageData;
  readonly private_hash: string;
}

export interface IArtworkAPIResultDataImageData {
  readonly full_url: string;
  readonly url: string;
  readonly thumbnails: IArtworkAPIResultDataImageThumbnail[]
}

export interface IArtworkAPIResultDataImageThumbnail {
  readonly url: string;
  readonly relative_url: string;
  readonly dimension: string;
  readonly width: number;
  readonly height: number;
}

export interface PredictionResult {
  artworkRecognized: boolean;
  artworks?: IArtwork[];
}

export interface ImageMeta {
  uri: string,
  width: number,
  height: number,
  base64?: string
}

export async function compressAndFormatImage(imageUri: string): Promise<ImageMeta> {
  return await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 500 } }],
    {
      compress: 0.8,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: false,
    },
  );
}

export async function recognizeImage(image: ImageMeta): Promise<PredictionResult> {

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
        'Prediction-Key': customVisionKeys.predictionKey,
        'Content-Type': 'multipart/form-data'
      },
      body: formBody
    });
    const result = await response.json();

    const predictedResult = result.predictions && result.predictions[0];

    if (predictedResult && predictedResult.probability > config.customVision.predictionConfidenceThreshold) {

      let artworks: IArtwork[] = []
      const artwork: IArtwork = await getArtworkByTagId(predictedResult.tagId);
      artworks.push(artwork);

      try {
        artworks = await getMatchingArtworks(artwork);
      } catch (e) {
        console.log('Unable to fetch matching artworks');
      }

      if (artworks.length > 0) {
        return {
          artworkRecognized: true,
          artworks
        }
      } else {
        return { artworkRecognized: false }
      }
    } else {
      return { artworkRecognized: false }
    }

  } catch (e) {
    console.log('An error occurred while contacting the image recognition service.');
    console.log(e);
    throw e;
  }

}

export async function getArtworkByTagId(tagId: string): Promise<IArtwork> {

  try {

    const response = await fetch(`${getAPIEndpoint().db}/items/${getKeys().collection}?filter[image_recognition_tag_id]=${tagId}&fields=*,image.*`);
    const result = await response.json();

    if (result.data[0]) {
      return Promise.resolve(processArtworkData(result.data[0]));
    } else {
      return Promise.reject();
    }

  } catch(e) {

    console.log('Unable to load artwork information');
    console.log(e);
    throw e;
  }

}

async function getMatchingArtworks(artwork: IArtwork): Promise<IArtwork[]> {

  try {

    const response = await fetch(`${getAPIEndpoint().db}/items/${getKeys().collection}?filter[artist_name]=${encodeURIComponent(artwork.artist_name)}&filter[title]=${encodeURIComponent(artwork.title)}&fields=*,image.*`);
    const result = await response.json();

    if (result.data && result.data.length > 0) {
      const artworks = result.data.map((artwork: IArtworkAPIResultData) => processArtworkData(artwork));
      return Promise.resolve(artworks);
    } else {
      return Promise.reject();
    }

  } catch(e) {
    console.log('Unable to request matching artworks');
    console.log(e);
    throw e;
  }

}

function processArtworkData(data: IArtworkAPIResultData): IArtwork {

  const stories: IStorySegment[] = [
    {id: 1, text: data.story_segment_1},
    {id: 1, text: data.story_segment_2},
    {id: 1, text: data.story_segment_3},
    {id: 1, text: data.story_segment_4},
    {id: 1, text: data.story_segment_5}
  ];

  let imagePath: string = '';
  let thumbnailPath: string = '';

  if (data.image && data.image.private_hash !== undefined) {
    imagePath = `${getAPIEndpoint().db}/assets/${data.image.private_hash}?w=1024&h=1024&f=contain&q=80`;
    thumbnailPath = `${getAPIEndpoint().db}/assets/${data.image.private_hash}?w=200&h=200&f=contain&q=80`;
  } else if (data.image && data.image.private_hash === undefined) {
    const imageQuality: string = 'good';
    imagePath = `${getAPIEndpoint().root}/thumbnail/_/1024/1024/contain/${imageQuality}/${data.image.filename}`;
    thumbnailPath = `${getAPIEndpoint().root}/thumbnail/_/200/200/contain/${imageQuality}/${data.image.filename}`;
  }


  const artwork: IArtwork = {
    id: data.id,
    title: data.title,
    artist_name: data.artist_name,
    artist_nationality: data.artist_nationality,
    year: data.year,
    image_url: imagePath,
    thumbnail_url: thumbnailPath,
    stories: stories
  };

  return artwork;

}
