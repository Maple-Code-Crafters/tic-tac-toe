import type { Game, Index } from '../Game';
import { Level } from '../Game';
import type { CpuAlgorithm } from './CpuAlgorithm';
import { Minimax } from './Minimax';
import { RandomMove } from './RandomMove';

export class CPU {
  // % chance of using Minimax
  EASY_LEVEL_THRESHOLD = 0.2;
  MEDIUM_LEVEL_THRESHOLD = 0.5;
  HARD_LEVEL_THRESHOLD = 0.9;

  private _level: Level;

  public constructor(level: Level) {
    this._level = level;
  }

  public chooseMove(game: Game): Index {
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
        // eslint-disable-next-line no-console
        console.error();
        cpuAlgorithm = this.getAlgorithm(algorithmProbability, this.EASY_LEVEL_THRESHOLD);
    }
    return cpuAlgorithm!.chooseMove(game);
  }

  private getAlgorithm(randomValue: number, threshold: number): CpuAlgorithm {
    if (randomValue > threshold) {
      return new RandomMove();
    } else {
      return new Minimax();
    }
  }
}
