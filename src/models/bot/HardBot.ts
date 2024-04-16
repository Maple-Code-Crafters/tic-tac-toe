import { Value } from '../Cell';
import type { Game, Index } from '../Game';
import type { Bot } from './Bot';

export class HardBot implements Bot {
  public chooseMove(game: Game): Index | undefined {
    let gameCopy = game.clone();

    console.log('Level Hard');

    const availableCells = game.getAvailableCells();
    if (game.finished() || game.hasWin() || !availableCells.length) {
      return;
    }

    const botTurn: Value = gameCopy.getTurn();
    let bestScore = -Infinity;
    let move: Index | undefined;

    availableCells.forEach((c, index) => {
      gameCopy.makeMove(availableCells[index]);
      let score = this.minimax(gameCopy, 0, false, botTurn);
      console.log('score', score);
      console.log('bestScore', bestScore);
      gameCopy.undoMove(availableCells[index]);
      if (score > bestScore) {
        bestScore = score;
        move = availableCells[index];
      }
      console.log('index', index);
      console.log('move', move);
    });

    return move;
  }

  private minimax(game: Game, depth: number, isMaximizing: boolean, botTurn: Value): number {
    if (game.hasWin()) {
      return game.winValue === botTurn ? -1 : 1;
    } else if (game.finished()) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      const availableCells = game.getAvailableCells();
      for (let i = 0; i < availableCells.length; i++) {
        game.makeMove(availableCells[i]);
        let score = this.minimax(game, depth + 1, false, botTurn);
        game.undoMove(availableCells[i]);
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      const availableCells = game.getAvailableCells();
      for (let i = 0; i < availableCells.length; i++) {
        game.makeMove(availableCells[i]);
        let score = this.minimax(game, depth + 1, true, botTurn);
        game.undoMove(availableCells[i]);
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  }
}
