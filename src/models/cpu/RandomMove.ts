import type { Game, Index } from '../Game';
import type { CpuAlgorithm } from './CpuAlgorithm';

export class RandomMove implements CpuAlgorithm {
  public chooseMove(game: Game): Index | undefined {
    const availableCells = game.getAvailableCells();
    if (game.finished() || game.hasWin() || !availableCells.length) {
      return;
    }
    return availableCells[Math.floor(Math.random() * availableCells.length)];
  }
}
