/* tslint:disable */

import { getAPIEndpoint } from '../environment';
import { ImageManipulator } from 'expo';

export interface IStorySegment {
  readonly id: number;
  readonly text: string;
}

export interface IArtwork {
  readonly id: number;
  readonly title: string;
  readonly artistName: string;
  readonly artistNationality: string;
  readonly releaseYear: number;
  readonly imageUrl: string;
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
  const formBody = new FormData();
  formBody.append('file', {
    uri: imageUri,
    name: 'image.jpeg',
    type: 'image/jpeg',
  });

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

  if (response.status !== 200) {
    return {
      success: false,
    };
  }
  const x = await response.json();
  // console.log(x);

  return {
    success: true,
    artwork: x,
  };
  // return (await response.json()) as IArtwork;
}
