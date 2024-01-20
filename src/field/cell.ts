import type { CellInterface } from './types';

export class Cell<Owner> implements CellInterface<Owner> {
  readonly isAvailable = true;

  private owner: Owner | null = null;

  getOwner(): Owner | null {
    return this.owner;
  }

  setOwner(newOwner: Owner): boolean {
    if (this.owner !== null) {
      return false;
    }

    this.owner = newOwner;
    return true;
  }
}

export class UnavailableCell implements CellInterface<never> {
  readonly isAvailable = false;
  getOwner(): null {
    return null;
  }

  setOwner(): boolean {
    return false;
  }
}
