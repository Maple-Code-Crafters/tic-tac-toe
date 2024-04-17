import { Value } from '../Cell';
import type { Game, Index } from '../Game';
import type { Bot } from './Bot';

export class HardBot implements Bot {
  public chooseMove(readOnlygame: Game): Index | undefined {
    let gameCopy = readOnlygame.clone();
    const availableCells = readOnlygame.getAvailableCells();
    console.log('availableCells', availableCells);
    console.log('game' + gameCopy.getCells());
    console.log('gameCopy.getCells()' + gameCopy.getCells());

    if (gameCopy.finished() || gameCopy.hasWin() || !availableCells.length) {
      return;
    }

    const botTurn: Value = gameCopy.getTurn();
    console.log('botTurn', botTurn);

    let bestScore = -Infinity;
    let move: Index | undefined;

    availableCells.forEach((c, index) => {
      console.log('XXXXXXXXXXX');
      gameCopy = readOnlygame.clone();

      gameCopy.makeMove(availableCells[index]);
      let score = this.minimax(gameCopy.clone(), 0, false, botTurn);
      //gameCopy.undoMove(availableCells[index]);
      console.log('after undo move gameCopy.getCells()' + gameCopy.getCells());

      console.log('before score', score);
      console.log('before bestScore', bestScore);
      if (score > bestScore) {
        bestScore = score;
        move = availableCells[index];
      }
      console.log('after score', score);
      console.log('after bestScore', bestScore);
      console.log('index', index);
      console.log('move', move);
    });
    console.log('XXXXXXXXXXX');

    console.log('Final move', move);

    return move;
  }

  private minimax(game: Game, depth: number, isMaximizing: boolean, botTurn: Value): number {
    // console.log('game cells' + game.getCells());
    // console.log(
    //   `game hasWin=${game.hasWin()} finished=${game.finished()} isMaximizing=${isMaximizing} depth=${depth} botTurn=${botTurn}`,
    // );
    if (game.hasWin()) {
      return game.winValue === botTurn ? 1 : -1;
    } else if (game.finished()) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      const availableCells = game.getAvailableCells();
      for (let i = 0; i < availableCells.length; i++) {
        let gameCopy = game.clone();
        gameCopy.makeMove(availableCells[i]);
        let score = this.minimax(gameCopy, depth + 1, false, botTurn);
        //game.undoMove(availableCells[i]);
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      const availableCells = game.getAvailableCells();
      for (let i = 0; i < availableCells.length; i++) {
        let gameCopy = game.clone();
        gameCopy.makeMove(availableCells[i]);
        let score = this.minimax(gameCopy, depth + 1, true, botTurn);
        //game.undoMove(availableCells[i]);
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  }
}
