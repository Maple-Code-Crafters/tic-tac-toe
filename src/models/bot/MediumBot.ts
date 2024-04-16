import type { Game, Index } from '../Game';
import type { Bot } from './Bot';

export class MediumBot implements Bot {
  public chooseMove(game: Game): Index | undefined {
    const availableCells = game.getAvailableCells();
    if (game.finished() || game.hasWin() || !availableCells.length) {
      return;
    }
    return availableCells[0];
  }
}
