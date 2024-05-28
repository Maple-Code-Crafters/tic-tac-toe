import type { Game, Index } from '../Game';
import type { CpuAlgorithm } from './CpuAlgorithm';

export class RandomMove implements CpuAlgorithm {
  public chooseMove(game: Game): Index {
    const availableCells = game.getAvailableCells();
    return availableCells[Math.floor(Math.random() * availableCells.length)];
  }
}
