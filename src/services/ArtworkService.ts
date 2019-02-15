import { getAPIEndpoint } from '../environment';

interface StorySegment {
  readonly id: number;
  readonly text: string;
}

interface Artwork {
  readonly id: number;
  readonly title: string;
  readonly artistName: string;
  readonly artistNationality: string;
  readonly imageUrl: string;
  readonly stories: StorySegment[];
}

const monaLisa: Artwork = {
  id: 22,
  title: 'Mona Lisa',
  artistName: 'Leonardo da Vinci',
  artistNationality: 'Italy',
  imageUrl:
    // tslint:disable-next-line
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1024px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  stories: [
    {
      id: 1,
      text:
        // tslint:disable-next-line
        "The original name of the Mona Lisa was Monna Lisa, but a spelling mistake made it the Mona Lisa. In Italian, Monna means Madonna, which means 'My lady'.",
    },
    {
      id: 2,
      text:
        // tslint:disable-next-line
        'Although many believe the painting was created in the image of Lisa Gherardini, others believe that it is a self-portrait of Leonardo da Vinci himself.',
    },
    {
      id: 3,
      text:
        // tslint:disable-next-line
        'Lisa Gherardini was the 24 year old wife of Francesco del Giocondo and mother of two sons.',
    },
  ],
};

const mockArtworks: Artwork[] = [monaLisa];

export async function getArtworkByPicture(imageData: string) {
  const apiEndpoint = `${getAPIEndpoint()}/artworks/query`;
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageData }),
  });
  return (await response.json()) as Artwork;
  // return mockArtworks[Math.floor(Math.random() * mockArtworks.length)];
}

export async function getArtworkById(id: number) {
  if (id === 2) {
    throw new Error(`Artwork with id ${id} not found`);
  }
  if (id === 0) {
    return monaLisa;
  }
  return mockArtworks[0];
}
