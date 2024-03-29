
export interface CellInterface<Content> {
  readonly isAvailable: boolean;

  /**
   * Возвращает содержимое (маркер) клетки или null, если клетка свободна
   */
  getContent(): Content | null;

  /**
   * Задаёт содержимое клетки (маркер), если возможно (и возвращает true);
   * если задать содержимое невозможно (например, клетка уже занята), вернёт false.
   * @param newContent
   */
  setContent(newContent: Content): boolean;
}

export interface FieldInterface<CellContent> {
  readonly width: number;
  readonly height: number;
  getCell(row: number, col: number): CellInterface<CellContent>;
}
