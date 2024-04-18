import { type Game, type Index, Level } from '../Game';
import type { CpuAlgorithm } from './CpuAlgorithm';
import { Minimax } from './Minimax';
import { RandomMove } from './RandomMove';

export class Cpu {
  private _level: Level;

  public constructor(level: Level) {
    this._level = level;
  }

  public chooseMove(game: Game): Index | undefined {
    const randomValue = Math.random();
    let cpuAlgorithm: CpuAlgorithm;

    switch (this._level) {
      case Level.Easy:
        // 20% chance of using Minimax
        cpuAlgorithm = this.getAlgorithm(randomValue, 0.2);
        break;

      case Level.Medium:
        // 60% chance of using Minimax
        cpuAlgorithm = this.getAlgorithm(randomValue, 0.6);
        break;

      case Level.Hard:
        // 85% chance of using Minimax
        cpuAlgorithm = this.getAlgorithm(randomValue, 0.85);
        break;

      default:
        throw new Error('Invalid level');
    }
    return cpuAlgorithm.chooseMove(game);
  }

  private getAlgorithm(randomValue: number, threshold: number): CpuAlgorithm {
    if (randomValue > threshold) {
      return new RandomMove();
    } else {
      return new Minimax();
    }
  }
}
