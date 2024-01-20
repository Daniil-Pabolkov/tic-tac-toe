
export interface CellInterface<Owner> {
  readonly isAvailable: boolean;

  /**
   * Возвращает владельца клетки (Owner) или null, если клетка свободна
   */
  getOwner(): Owner | null;

  /**
   * Задаёт владельца кленки, если возможно (и возвращает true),
   * если установить владельца невозможно (например, клетка уже занята), вернёт false.
   * @param newOwner
   */
  setOwner(newOwner: Owner): boolean;
}

export interface FieldInterface<CellOwner> {
  readonly width: number;
  readonly height: number;
  getCell(row: number, col: number): CellInterface<CellOwner>;
}
