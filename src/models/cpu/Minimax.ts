import type { Value } from '../Cell';
import type { Game, Index } from '../Game';
import type { CpuAlgorithm } from './CpuAlgorithm';

export class Minimax implements CpuAlgorithm {
  static readonly MAX_CELLS = 9;

  public chooseMove(game: Game): Index | undefined {
    //console.log('Minimax');
    const availableCells = game.getAvailableCells();

    if (game.finished() || game.hasWin() || !availableCells.length) {
      return;
    }

    // if the game is in the first turn, choose the left top corner, otherwise Minimax takes almost 2s to come to the same conclusion
    if (availableCells.length === Minimax.MAX_CELLS) {
      return 0;
    }

    const cpuTurn: Value = game.getTurn();

    let bestScore = -Infinity;
    let move: Index | undefined;

    for (const cell of availableCells) {
      game.makeMove(cell);
      const score = this.minimax(game, cpuTurn);
      game.undoMove(cell);

      if (score > bestScore) {
        bestScore = score;
        move = cell;
      }
    }

    return move;
  }

  private minimax(game: Game, cpuTurn: Value): number {
    const availableCells = game.getAvailableCells();

    if (game.hasWin()) {
      return game.winValue === cpuTurn ? 1 * availableCells.length : -1 * availableCells.length;
    } else if (game.finished()) {
      return 0;
    }

    if (cpuTurn === game.getTurn()) {
      let bestScore = -Infinity;
      for (const cell of availableCells) {
        game.makeMove(cell);
        const score = this.minimax(game, cpuTurn);
        game.undoMove(cell);
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (const cell of availableCells) {
        game.makeMove(cell);
        const score = this.minimax(game, cpuTurn);
        game.undoMove(cell);
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  }
}
