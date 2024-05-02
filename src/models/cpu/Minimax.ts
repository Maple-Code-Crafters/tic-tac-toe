import type { Value } from '../Cell';
import type { Game, Index } from '../Game';
import type { CpuAlgorithm } from './CpuAlgorithm';

export class Minimax implements CpuAlgorithm {
  public chooseMove(game: Game): Index | undefined {
    const availableCells = game.getAvailableCells();

    if (game.finished() || game.hasWin() || !availableCells.length) {
      return;
    }

    // if the game is in the first turn, choose the left top corner, otherwise Minimax takes almost 2s to come to the same conclusion
    if (availableCells.length === 9) {
      return 0;
    }

    const cpuTurn: Value = game.getTurn();

    let bestScore = -Infinity;
    let move: Index | undefined;

    for (const cell of availableCells) {
      game.makeMove(cell);
      const score = this.minimax(game, 0, false, cpuTurn);
      game.undoMove(cell);

      if (score > bestScore) {
        bestScore = score;
        move = cell;
      }
    }

    return move;
  }

  private minimax(game: Game, depth: number, isMaximizing: boolean, cpuTurn: Value): number {
    if (game.hasWin()) {
      return game.winValue === cpuTurn ? 1 : -1;
    } else if (game.finished()) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      const availableCells = game.getAvailableCells();
      for (const cell of availableCells) {
        game.makeMove(cell);
        const score = this.minimax(game, depth + 1, false, cpuTurn);
        game.undoMove(cell);
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      const availableCells = game.getAvailableCells();
      for (const cell of availableCells) {
        game.makeMove(cell);
        const score = this.minimax(game, depth + 1, true, cpuTurn);
        game.undoMove(cell);
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  }
}
