import type { Value } from '../Cell';
import type { Game, Index } from '../Game';
import type { CpuAlgorithm } from './CpuAlgorithm';

export class Minimax implements CpuAlgorithm {
  public chooseMove(readOnlygame: Game): Index | undefined {
    let gameCopy = readOnlygame.clone();
    const availableCells = readOnlygame.getAvailableCells();

    if (gameCopy.finished() || gameCopy.hasWin() || !availableCells.length) {
      return;
    }

    // if the game is in the first turn, choose the left top corner, otherwise MInimax takes 2s to come to the same conclusion
    if (availableCells.length === 9) {
      return 0;
    }

    const cpuTurn: Value = gameCopy.turn;

    let bestScore = -Infinity;
    let move: Index | undefined;

    for (const cell of availableCells) {
      gameCopy = readOnlygame.clone();

      gameCopy.makeMove(cell);
      const score = this.minimax(gameCopy.clone(), 0, false, cpuTurn);

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
        const gameCopy = game.clone();
        gameCopy.makeMove(cell);
        const score = this.minimax(gameCopy, depth + 1, false, cpuTurn);
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      const availableCells = game.getAvailableCells();
      for (const cell of availableCells) {
        const gameCopy = game.clone();
        gameCopy.makeMove(cell);
        const score = this.minimax(gameCopy, depth + 1, true, cpuTurn);
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  }
}
