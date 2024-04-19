import { type Game, type Index, Level } from '../Game';
import type { CpuAlgorithm } from './CpuAlgorithm';
import { Minimax } from './Minimax';
import { RandomMove } from './RandomMove';

export class Cpu {
  // % chance of using Minimax
  EASY_LEVEL_THRESHOLD = 0.2;
  MEDIUM_LEVEL_THRESHOLD = 0.6;
  HARD_LEVEL_THRESHOLD = 0.85;

  private _level: Level;

  public constructor(level: Level) {
    this._level = level;
  }

  public chooseMove(game: Game): Index | undefined {
    const algorithmProbability = Math.random();
    let cpuAlgorithm: CpuAlgorithm;

    switch (this._level) {
      case Level.Easy:
        cpuAlgorithm = this.getAlgorithm(algorithmProbability, this.EASY_LEVEL_THRESHOLD);
        break;

      case Level.Medium:
        cpuAlgorithm = this.getAlgorithm(algorithmProbability, this.MEDIUM_LEVEL_THRESHOLD);
        break;

      case Level.Hard:
        cpuAlgorithm = this.getAlgorithm(algorithmProbability, this.HARD_LEVEL_THRESHOLD);
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
