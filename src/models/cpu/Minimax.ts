import type { Value } from '../Cell';
import type { Game, Index } from '../Game';
import type { CpuAlgorithm } from './CpuAlgorithm';

export class Minimax implements CpuAlgorithm {
  static readonly MAX_CELLS = 9;

  public chooseMove(game: Game): Index | undefined {
    const availableCells = game.getAvailableCells();

    if (game.finished() || game.hasWin() || !availableCells.length) {
      return;
    }

    // if the game is in the first turn, choose the left top corner, otherwise Minimax takes almost 2s to come to the same conclusion
    if (availableCells.length === Minimax.MAX_CELLS) {
      return 0;
    }

    const cpuTurn: Value = game.turn;

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
    if (game.hasWin()) {
      return this.calculateScore(game, cpuTurn);
    } else if (game.finished()) {
      return 0;
    }

    const availableCells = game.getAvailableCells();

    if (game.isCpuTurn()) {
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

  /**
   * The higher the score, the better the move
   *
   * The best winning move is the one that takes the least amount of moves
   * For example:
   * (1) The Bot wins when there are still 4 available cells to be played, the score is 1 * 4 = 4
   * (2) The Bot wins when there are still 2 available cells to be played, the score is 1 * 2 = 2
   * The best move is (1) since the bot can win faster
   *
   * The move that will make the bot loose faster is the one that takes least amount of moves
   * For example:
   * (1) The Bot loses when there are still 4 available cells to be played (5 played cells), the score is -1 * 5 = -5
   * (2) The Bot loses when there are still 2 available cells to be played (7 played cells), the score is -1 * 7 = -7
   * In the two cases the bot loses, but the Bot will loose faster in case (1), so it has to be a higher score. -5 is greater than -7.
   *
   * @param game
   * @param cpuTurn tells if the CPU is the X or O
   * @returns the score of the move
   */
  private calculateScore(game: Game, cpuTurn: Value): number {
    const availableCells = game.getAvailableCells().length;
    const playedCells = Minimax.MAX_CELLS - availableCells;
    return game.winValue === cpuTurn ? 1 * availableCells : -1 * playedCells;
  }
}
