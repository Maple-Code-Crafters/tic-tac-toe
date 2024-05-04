import { Game, type Index, Level } from '../Game';
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

  public chooseMove(originalGame: Game): Index | undefined {
    const game: Game = Game.fromArchived(originalGame.toArchived());
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
