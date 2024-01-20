import type { FieldInterface, CellInterface } from './types';
import { Cell, UnavailableCell } from './cell';

export class Field<CellOwner> implements FieldInterface<CellOwner> {
  private readonly cells: CellInterface<CellOwner>[];

  constructor(private size: number = 3) {
    this.cells = new Array(Math.pow(this.size, 2))
      .fill(null)
      .map(() => {
        return new Cell<CellOwner>();
      });
  }

  get width() {
    return this.size;
  }

  get height() {
    return this.size;
  }

  getCell(row: number, col: number) {
    const index = this.getCellIndex(row, col);

    if (index === null) {
      return new UnavailableCell();
    }

    // Возвращаемый index всегда в рамках размерности поля
    return this.cells[index]!;
  }

  private getCellIndex(row: number, col: number): number | null {
    if (row >= this.size || col >= this.size) {
      return null;
    }

    const index = row * this.size + col;

    return index < 0 ? null : index;
  }
}