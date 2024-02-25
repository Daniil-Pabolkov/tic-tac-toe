import { describe, it, expect } from 'vitest';
import { createFieldFromTemplate } from '@app/utils/field-utils';
import type { WinnerCombination } from '@app/win-detector/types';
import { Simple3x3 } from '../Simple3x3';

type MarkerType = 'x' | 'o';
const markers: MarkerType[] = ['x', 'o'];

describe('3x3 field winner simple detector', () => {

  it('Empty field', () => {
    const field = createFieldFromTemplate<MarkerType>(`
      . . .
      . . .
      . . .
    `, markers);
    const winDetector = new Simple3x3<MarkerType>(field, markers, 3);

    expect(winDetector.detect()).toEqual({
      who: null,
      combinations: [],
    } as WinnerCombination<MarkerType>);
  });

  it('Without winner', () => {
    const field = createFieldFromTemplate<MarkerType>(`
      x x o
      o x x
      x o o
    `, markers);
    const winDetector = new Simple3x3<MarkerType>(field, markers, 3);

    expect(winDetector.detect()).toEqual({
      who: null,
      combinations: [],
    } as WinnerCombination<MarkerType>);
  });

  it('With winner by 1 combination', () => {
    const field = createFieldFromTemplate<MarkerType>(`
      x x o
      o x x
      o x o
    `);
    const winDetector = new Simple3x3<MarkerType>(field, markers, 3);

    expect(winDetector.detect()).toEqual({
      who: 'x',
      combinations: [
        [
          { row: 0, col: 1 },
          { row: 1, col: 1 },
          { row: 2, col: 1 },
        ],
      ],
    } as WinnerCombination<MarkerType>);
  });

  it('With winner by 2 combinations', () => {
    const field = createFieldFromTemplate<MarkerType>(`
      x o o
      x x o
      x o x
    `);
    const winDetector = new Simple3x3<MarkerType>(field, markers, 3);

    expect(winDetector.detect()).toEqual({
      who: 'x',
      combinations: [
        [
          { row: 0, col: 0 },
          { row: 1, col: 0 },
          { row: 2, col: 0 },
        ],
        [
          { row: 0, col: 0 },
          { row: 1, col: 1 },
          { row: 2, col: 2 },
        ],
      ],
    } as WinnerCombination<MarkerType>);
  });

  it('With 2 winners (invalid case)', () => {
    const field = createFieldFromTemplate<MarkerType>(`
      x . o
      x . o
      x . o
    `, markers);
    const winDetector = new Simple3x3<MarkerType>(field, markers, 3);

    expect(() => winDetector.detect()).toThrow(new Error('Слишком много победителей'));
  });

  describe('Check winner by marker', () => {
    const field = createFieldFromTemplate<MarkerType>(`
      x x o
      o x x
      o x o
    `);
    const winMarker = new Simple3x3<MarkerType>(field, markers, 3);

    it('Check by «o» (not winner)', () => {
      winMarker.setFocusMarker('o');
      expect(winMarker.detect()).toEqual({
        who: null,
        combinations: [],
      } as WinnerCombination<MarkerType>);
    });

    it('Check by «x» (winner)', () => {
      winMarker.setFocusMarker('x');
      expect(winMarker.detect()).toEqual({
        who: 'x',
        combinations: [
          [
            { row: 0, col: 1 },
            { row: 1, col: 1 },
            { row: 2, col: 1 }
          ]
        ]
      } as WinnerCombination<MarkerType>);
    })
  });
});
