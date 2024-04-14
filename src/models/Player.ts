import type { Value } from './Cell';

export type ArchivedPlayer = {
  name: string;
  value: Value;
};

export class Player {
  constructor(
    private _name: string,
    private _value: Value,
  ) {}

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get value(): Value {
    return this._value;
  }

  public toArchived(): ArchivedPlayer {
    return { name: this._name, value: this._value };
  }

  static fromArchived(archivedPlayer: ArchivedPlayer): Player {
    return new Player(archivedPlayer.name, archivedPlayer.value);
  }
}
