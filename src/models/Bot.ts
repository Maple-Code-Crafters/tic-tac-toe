import type { Game } from './Game';

export class Bot {
  private _name: string = 'CPU (easy)';

  public get name() {
    return this._name;
  }

  public makeMove(game: Game): number {
    const availableCells = game.getAvailableCells();
    if (game.finished() || game.hasWin() || !availableCells.length) {
      return -1;
    }
    return availableCells[Math.floor(Math.random() * availableCells.length)];
  }
}
