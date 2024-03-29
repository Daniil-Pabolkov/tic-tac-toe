import { describe, it, expect } from 'vitest';
import { Field } from '../field';

describe('Check field rules', () => {
  it('Check dimension', () => {
    const field = new Field(3);
    expect(field.width, `Field's width should be 3`).toBe(3);
    expect(field.height, `Field's height should be 3`).toBe(3);
  });

  it(`Check cell's availability`, () => {
    const field = new Field(3);
    expect(
      field.getCell(-1, -1).isAvailable,
      `Cell by index {-1;-1} is not available: index shouldn't be a negative`
    ).toBeFalsy();
    expect(
      field.getCell(4, 4).isAvailable,
      `Cell by index {4;4} is not available: index shouldn't be greater than field's dimension`
    ).toBeFalsy();
    expect(
      field.getCell(3, 3).isAvailable,
      `Cell by index {3;3} is not available: index shouldn't be equal to dimension, because index value starts by 0 and can have possible value in range from 0 to 2 included`
    ).toBeFalsy();
    expect(
      field.getCell(1, 1).isAvailable,
      `Cell by index {1;1} is available: index in range of 0..3`
    ).toBeTruthy();
  });

  describe(`Check cell's content`, () => {
    it('Set content into available cell', () => {
      const field = new Field<'x' | 'o'>(3);

      expect(
        field.getCell(1, 1).getContent(),
        `Cell by index {1;1} hasn't content`
      ).toBeNull();
      expect(
        field.getCell(1, 1).setContent('x'),
        `Set content into cell by index {1;1} is success`
      ).toBeTruthy();
      expect(
        field.getCell(1, 1,).getContent(),
        `Cell by index {1;1} set content 'x' (it was added at previous step)`
      ).toBe('x');
      expect(
        field.getCell(1, 1).setContent('o'),
        `Set content into cell by index {1;1} is failed: content was set at 2 steps before`
      ).toBeFalsy();
    });

    it('Set content into unavailable cell', () => {
      const field = new Field<'x' | 'o'>(3);
      expect(
        field.getCell(4, 4).getContent(),
        `Cell by index {4;4} hasn't content: it's cell is unavailable`
      ).toBeNull();
      expect(
        field.getCell(4, 4).setContent('x'),
        `Set content into cell by index {4;4} is failed: it's cell is unavailable`
      ).toBeFalsy();
    });
  });
});
