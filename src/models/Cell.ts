import type { Index } from './Game';

export type Value = 'O' | 'X' | undefined;

export type ArchivedCell = {
  index: Index;
  value: Value;
  className: string | undefined;
};

export class Cell {
  private _value: Value;
  public className: string | undefined;

  constructor(private _index: Index) {}

  public get value() {
    return this._value;
  }

  public get index() {
    return this._index;
  }

  public set value(value: Value) {
    if (!(this.value && value && this.value !== value)) {
      this._value = value;
    }
  }

  public toString() {
    return this._value;
  }

  public toArchived(): ArchivedCell {
    return {
      index: this._index,
      value: this._value,
      className: this.className,
    };
  }

  public clone(): Cell {
    const cell = new Cell(this.index);
    cell.value = this.value;
    return cell;
  }
}
