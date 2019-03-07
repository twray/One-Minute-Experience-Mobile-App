/* tslint:disable */

import { getAPIEndpoint } from '../environment';

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

const monaLisa: IArtwork = {
  id: 22,
  title: 'Mona Lisa',
  artistName: 'Leonardo da Vinci',
  artistNationality: 'Italy',
  releaseYear: 1999,
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1024px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  stories: [
    {
      id: 1,
      text:
        "The original name of the Mona Lisa was Monna Lisa, but a spelling mistake made it the Mona Lisa. In Italian, Monna means Madonna, which means 'My lady'.",
    },
    {
      id: 2,
      text:
        'Although many believe the painting was created in the image of Lisa Gherardini, others believe that it is a self-portrait of Leonardo da Vinci himself.',
    },
    {
      id: 3,
      text:
        'Lisa Gherardini was the 24 year old wife of Francesco del Giocondo and mother of two sons.',
    },
  ],
};

const pearlEarring: IArtwork = {
  id: 33,
  title: 'Girl with a Pearl Earring',
  artistName: 'Johannes Vermeer',
  artistNationality: 'Netherlands',
  releaseYear: 1665,
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Meisje_met_de_parel.jpg/512px-Meisje_met_de_parel.jpg',
  stories: [
    {
      id: 1,
      text:
        'Going by various names over the centuries, it became known by its present title towards the end of the 20th century after the large pearl earring worn by the girl portrayed there.',
    },
    {
      id: 2,
      text:
        'Some of the first literary treatments of the painting were in poems. For Yann Lovelock in his sestina, "Vermeer’s Head of a Girl", it is the occasion for exploring the interplay between imagined beauty interpreted on canvas and living experience.',
    },
    {
      id: 3,
      text:
        'Scholars estimate the painting was completed in 1665. The painting is an example of a type of work called a tronie. Popular in the Dutch Golden Age, tronies were paintings that focused on the face of a subject with an added element of fantasy or an exaggeration of expression that differentiates them from portraits.',
    },
  ],
};

const mockArtworks: IArtwork[] = [monaLisa, pearlEarring];

export async function getArtworkByPicture(imageData: string) {
  const apiEndpoint = `${getAPIEndpoint()}/artworks/query`;
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageData }),
  });
  return (await response.json()) as IArtwork;
}


export async function getArtworkById(id: number) {
  return mockArtworks[Math.floor(Math.random() * mockArtworks.length)];
  // if (id === 2) {
  //   throw new Error(`Artwork with id ${id} not found`);
  // }
  // if (id === 0) {
  //   return monaLisa;
  // }
  // return mockArtworks[0];
}

export async function getArtworkByData(data: string){

}
