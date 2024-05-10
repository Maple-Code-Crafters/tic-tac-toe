import type { PlayerConfig } from '../slices/gameSlice';
import type { Value } from './Cell';

export class Player {
  private _name: string;
  private _value: Value;
  private _isCpu: boolean;

  constructor(config: PlayerConfig) {
    this._name = config.name;
    this._value = config.value;
    this._isCpu = config.isCpu;
  }

  public get name() {
    return this._name;
  }

  public get value() {
    return this._value;
  }

  public get isCpu() {
    return this._isCpu;
  }

  public toConfig(): PlayerConfig {
    return { name: this._name, value: this._value, isCpu: this._isCpu };
  }

  static fromConfig(config: PlayerConfig): Player {
    return new Player(config);
  }
}
