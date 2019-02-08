import { getArtworkById } from './ArtworkService';

describe('artwork service', () => {
  test('artwork can be fetched', async () => {
    const artwork = await getArtworkById(0);
    expect(artwork.title).toBe('Mona Lisa');
  });
});
