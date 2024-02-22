import { describe, it, expect } from 'vitest';
import { parseTemplate, createFieldFromTemplate } from '../field-utils';

describe('Method: parseTemplate()', () => {
   it('2 players (3x3 field)', () => {
      const parsed = parseTemplate(`
         o . o
         
         . x x
         
         .
      `, ['x', 'o']);

      expect(parsed.markers).toEqual(new Set(['o', 'x']));
      expect(parsed.cells).toEqual(new Map([
         ['x', [{ row: 1, col: 1 }, { row: 1, col: 2 }]],
         ['o', [{ row: 0, col: 0 }, { row: 0, col: 2 }]],
      ]));
   });
});

describe('Method: createFieldFromTemplate()', () => {
   it('2 players (5x5 field)', () => {
      const field = createFieldFromTemplate(`
         . . . . .
         . x . x .
         . . x . o
         . o . o .
         . . x . .
      `, ['x', 'o']);

      expect(field.width).toBe(5);
      expect(field.height).toBe(5);
      expect(field.getCell(0, 0).getContent()).toBeNull();

      expect(field.getCell(1, 1).getContent()).toBe('x');
      expect(field.getCell(1, 3).getContent()).toBe('x');
      expect(field.getCell(2, 2).getContent()).toBe('x');
      expect(field.getCell(4, 2).getContent()).toBe('x');

      expect(field.getCell(2, 4).getContent()).toBe('o');
      expect(field.getCell(3, 1).getContent()).toBe('o');
      expect(field.getCell(3, 3).getContent()).toBe('o');
   })
});
