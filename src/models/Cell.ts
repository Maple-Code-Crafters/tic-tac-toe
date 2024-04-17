export type Value = 'O' | 'X';

export type ArchivedCell = {
  index: number;
  value: Value;
  className: string;
};

export class Cell {
  private _value!: Value;
  public className!: string;

  constructor(private _index: number) {}

  public get value() {
    return this._value;
  }

  public get index() {
    return this._index;
  }

  public set value(value: Value) {
    if (!this._value) {
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

  public clone() {
    const cell = new Cell(this._index);
    cell._value = this._value;
    cell.className = this.className;
    // console.log('this', this);
    // console.log('cell', cell);
    return cell;
  }
}
