import type { FieldInterface } from '@app/field';
import type { GameInterface } from './types';

export class Game<CellContent = unknown> implements GameInterface<CellContent> {
  readonly numberOfPlayers: number;
  readonly hasWinner: boolean = false;
  readonly winner: number | null = null;

  private _currentPlayer: number = 0;

  constructor(
    readonly field: FieldInterface<CellContent>,
    readonly playerMarkers: CellContent[],
  ) {
    this.numberOfPlayers = playerMarkers.length;
  }

  get stepOf(): number {
    return this._currentPlayer;
  }

  // todo Нужно на async-функцию переделать
  makeStep(row: number, col: number): Promise<boolean> {
    const cell = this.field.getCell(row, col);

    if (!cell.isAvailable || cell.getContent() !== null) {
      return Promise.resolve(false);
    }

    cell.setContent(this.getPlayerMarker());

    this.nextStep();

    return Promise.resolve(true);
  }

  getPlayerMarker(): CellContent {
    return this.playerMarkers[this.stepOf];
  }

  private nextStep() {
    this._currentPlayer = (this._currentPlayer + 1) % this.numberOfPlayers;
  }
}
