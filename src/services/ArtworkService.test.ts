import * as artworkService from './ArtworkService';

describe('ArtworkService', () => {
  beforeEach(() => {
    (fetch as any).resetMocks();
  });

  it('returns with success and artwork if prediction was succesful', async () => {
    (fetch as any).mockResponse(
      JSON.stringify({
        title: 'Artwork Title',
      }),
    );
    const res = await artworkService.recognizeImage('test');
    expect(res.success).toBeTruthy();
    expect(res.artwork).toBeDefined();
    expect(res.artwork!.title).toBe('Artwork Title');
  });

  it('returns with non-success if prediction failed', async () => {
    (fetch as any).mockResponse('', { status: 400 });
    const res = await artworkService.recognizeImage('test');
    expect(res.success).toBeFalsy();
  });
});
