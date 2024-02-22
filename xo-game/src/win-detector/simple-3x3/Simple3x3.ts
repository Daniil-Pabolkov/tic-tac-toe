import type { FieldInterface } from '@app/field';
import type {  WinnerCombination } from '../types';
import { WinnerDetectorBase } from '../types';

type CellCoords = [number, number];
type CellSequence = CellCoords[];

export class Simple3x3<PlayerMarker> extends WinnerDetectorBase<PlayerMarker> {
   static readonly limits = {
      players: {
         min: 2,
         max: 2,
      },
      field: {
         width: {
            min: 3,
            max: 3,
         },
         height: {
            min: 3,
            max: 3,
         },
      },
      sequenceLength: {
         min: 3,
         max: 3,
      },
   } as const;

   constructor(
      readonly field: FieldInterface<PlayerMarker>,
      readonly markers: PlayerMarker[],
      readonly sequenceLength: number,
   ) {
      super();
   }

   detect(): WinnerCombination<PlayerMarker> {
      if (!this.valid()) {
         return {
            who: null,
            combinations: [],
         };
      }

      const winCombinations = new Map<PlayerMarker, Array<[number, number][]>>();

      for (const template of this.Templates) {
         const who = this.detectByTemplate(template);

         if (who === null || (this.focusMarker && this.focusMarker !== who)) {
            continue;
         }

         if (!winCombinations.has(who)) {
            winCombinations.set(who, []);
         }

         winCombinations.get(who)!.push(template);
      }

      if (winCombinations.size > 1) {
         // todo Нужно добавить новый экземпляр Error -> TooManyWinners
         throw new Error('Слишком много победителей');
      }

      if (winCombinations.size === 0) {
         return {
            who: null,
            combinations: [],
         }
      }

      const [who, combinations] = [...winCombinations.entries()][0];

      return {
         who,
         combinations: combinations.map(comb => {
            return comb.map(([row, col]) => ({ row, col }));
         }),
      };
   }

   detectByTemplate(template: CellSequence): PlayerMarker | null {
      const who: PlayerMarker | null = null;

      for (const [row, col] of template) {
         const cellMarker = this.field.getCell(row, col).getContent();

         if (who !== null && cellMarker !== who) {
            return null;
         }
      }

      return who;
   }

   /**
    * Шаблоны победных комбинаций:
    * - Каждый эл-т массива -- набор ячеек комбинации (
    * - Каждая ячейка -- [row; col]
    * @private
    */
   private readonly Templates: CellSequence[] = [
      // Горизонтальные
      [[0, 0], [0, 1], [0, 1]],
      [[1, 0], [1, 1], [1, 1]],
      [[2, 0], [2, 1], [2, 1]],
      // Вертикальные
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Диагональные
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
   ] as const;
}
