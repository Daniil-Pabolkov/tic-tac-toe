import type { CellInterface } from './types';

export class Cell<Content> implements CellInterface<Content> {
  readonly isAvailable = true;

  private content: Content | null = null;

  getContent(): Content | null {
    return this.content;
  }

  setContent(newOwner: Content): boolean {
    if (this.content !== null) {
      return false;
    }

    this.content = newOwner;
    return true;
  }
}

export class UnavailableCell implements CellInterface<null> {
  readonly isAvailable = false;
  getContent(): null {
    return null;
  }

  setContent(): boolean {
    return false;
  }
}
