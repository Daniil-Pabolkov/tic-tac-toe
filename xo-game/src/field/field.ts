import type { FieldInterface, CellInterface } from './types';
import { Cell, UnavailableCell } from './cell';

export class Field<CellContent> implements FieldInterface<CellContent> {
  private readonly cells: CellInterface<CellContent>[];

  constructor(private size: number = 3) {
    this.cells = Array(this.size ** 2)
      .fill(void 0)
      .map(() => {
        return new Cell<CellContent>();
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

    return this.cells[index] ?? new UnavailableCell();
  }

  private getCellIndex(row: number, col: number): number | null {
    if (row >= this.size || col >= this.size) {
      return null;
    }

    const index = row * this.size + col;

    return index < 0 ? null : index;
  }
}