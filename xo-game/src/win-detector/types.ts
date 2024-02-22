import type { FieldInterface } from '@app/field';

interface MinMax {
   readonly min: number;
   readonly max: number;
}

export interface WinnerCombination<CellContent> {
   /**
    * Маркер игрока-победителя, если таковой есть (если нету -- null)
    */
   who: CellContent | null;
   /**
    * Перечень победных комбинаций, если таковых нет, массив будет пуст.
    * Пример сценария с несколькими комбинациями:
    * ```text
    * x o o
    * x x o
    * x o x
    * ```
    * В данном случае {@link combinations} будет иметь сл. данные:
    * ```text
    * [ // {row;col}
    *    [ {0;0} {1;0} {2;0} ]
    *    [ {0;0} {1;1} {2;2} ]
    * ]
    * ```
    */
   combinations: Array<{ row: number, col: number }>[];
}

export abstract class WinnerDetectorBase<CellContent> {
   static readonly limits: {
      readonly players: MinMax;
      readonly field: {
         readonly width: MinMax;
         readonly height: MinMax;
      }
      readonly sequenceLength: MinMax;
   };

   protected get limits() {
      return (this.constructor as typeof WinnerDetectorBase).limits;
   }

   /**
    * Маркеры игроков.\n
    * Их кол-во должно соответствовать допустимому кол-ву игроков (см. {@link limits.players})
    */
   abstract readonly markers: CellContent[];

   /**
    * Игровое поле, на котором работает мех-м определения победителя.
    *
    */
   abstract readonly field: FieldInterface<CellContent>;

   /**
    * Минимальная длина последовательности маркеров игрока, составляющие выигрышную комбинацию.\n
    * Не должна выходить за рамки выставленных ограничений (см. {@link limits.sequenceLength}).
    */
   abstract readonly sequenceLength: number;

   protected focusMarker: CellContent | null = null;

   /**
    * Проверяет корректность объекта:
    * - Кол-во маркеров ({@link markers}) должно соответствовать ограничениям (см. {@link limits.players});
    * - Размерность поля ({@link field}) должна соответствовать ограничениям (см. {@link limits.field}).
    */
   valid(): boolean {
      // todo Нужно проверить, что параметры (limits) вообще заданы правильно
      //      (нужно отдельно сделать,т.к. кадлый раз проверять нет смысла)

      // todo Нужно проверить, что кол-во маркеров, размерность поля и длина победной последовательности соответствуют
      //      ограничениям (limits)

      // todo Нужно проверить, что последовательность указанной размерности в принципе можно составить на данном поле.

      return true;

      // return (
      //    // Проверка кол-ва маркеров
      //    this.checkRange(this.markers.length, this.limits.players)
      //    // Проверка размерности поля
      //    && this.checkRange(this.field.width, this.limits.field.width)
      //    && this.checkRange(this.field.height, this.limits.field.height)
      //    // Проверка возможности составить необходимую комбинацию:
      //    //    Мин. длина должна быть НЕ меньше наименьшей диагонали (которая равна наименьшей ширине)
      //    && this.limits.sequenceLength.min <= Math.min(this.field.width, this.field.height)
      //    //    Макс. длина должна быть НЕ меньше наименьшей диагонали (которая равна наименьшей ширине)
      //    && this.limits.sequenceLength.min <= Math.min(this.field.width, this.field.height)
      // );
   }

   // private checkRange(value: number, range: MinMax): boolean {
   //    return value >= range.min && value <= range.max;
   // }

   /**
    * Задаёт маркер, для которого необходимо выполнить проверку
    * (если задан -- проверяется только для него, остальные маркеры игнорируются)
    * @param marker
    */
   setFocusMarker(marker: CellContent): void {
      // todo Добавить проброс исключения, если marker не соответствует ни одному из возможных (this.markers)
      this.focusMarker = marker;
   }

   /**
    * Удаляет маркер, ограничивающий мех-зм определения победителя
    */
   resetFocusMarker(): void {
      this.focusMarker = null;
   }

   /**
    * Возвращает маркер, для которого будет проводиться определение победителя при вызове {@link detect}.
    */
   getTargetMarker(): CellContent | null {
      return this.focusMarker;
   }

   /**
    * Определяет наличие победителя и перечень победных комбинаций (если таковые имеются)ю
    *
    * @throws {Error} Бросает исключение, если {@link valid()} возвращает false.
    */
   abstract detect(): WinnerCombination<CellContent>;
}