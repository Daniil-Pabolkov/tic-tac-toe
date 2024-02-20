import { FieldInterface } from '@app/field';

export interface GameInterface<CellContent = unknown> {
  // Кол-во игроков, участвующих в игре
  readonly numberOfPlayers: number;
  // № игрока, которому принадлежит ход: [0, numberOfPlayers)
  readonly stepOf: number;
  // Имеется ли победитель
  readonly hasWinner: boolean;
  // № игрока, одержавшего победу
  readonly winner: number | null;
  // Маркеры игроков (индекс соответствует порядку хода {@link stepOf})
  readonly playerMarkers: CellContent[];

  readonly field: FieldInterface<CellContent>;

  /**
   * Устанавливает маркер игрока №{@link stepOf} в позицию ({@link row}; {@link col}).
   *
   * Вернёт false, если ход невозможен, т.е. в сл. случаях:
   * - ячейка в указанной позиции не существует;
   * - ячейка в указанной позиции занята другим игроком.
   */
  makeStep(row: number, col: number): Promise<boolean>;

  /**
   * Возвращает маркер текущего игрока (т.е. игрока, чей {@link stepOf})
   */
  getPlayerMarker(): CellContent;
}
