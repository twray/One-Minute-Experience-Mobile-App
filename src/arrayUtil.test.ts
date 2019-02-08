import { removeIndex } from './arrayUtil';

describe('Array Utilities', () => {
  it('removes index', () => {
    const a = [1, 2, 3, 4];
    const expected = [1, 3, 4];
    expect(removeIndex(a, 1)).toEqual(expected);
  });
});
