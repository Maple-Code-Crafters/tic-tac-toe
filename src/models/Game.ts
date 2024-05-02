import { v4 as uuidv4 } from 'uuid';

import type { ArchivedCell, Value } from './Cell';
import { Cell } from './Cell';
import type { ArchivedPlayer } from './Player';
import { Player } from './Player';

export type Index = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export enum NumberOfPlayers {
  OnePlayer = 1,
  TwoPlayers = 2,
}

export enum Level {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export type ArchivedGame = {
  player1: ArchivedPlayer;
  player2: ArchivedPlayer;
  cells: ArchivedCell[];
  gridClassNameWin: string;
  winValue: Value | undefined;
  numberOfPlayers: NumberOfPlayers;
  level: Level;
};

export class Game {
  private _id: string;
  private _player1: Player;
  private _player2: Player;
  private _numberOfPlayers: NumberOfPlayers;
  private _level: Level;
  private _cells: [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
  private _gridClassNameWin!: string;
  private _turn: Value;
  public winValue: Value | undefined;

  constructor(player1: Player, player2: Player, numberOfPlayers: NumberOfPlayers, level: Level, turn?: Value) {
    this._id = uuidv4();
    this._player1 = player1;
    this._player2 = player2;
    this._numberOfPlayers = numberOfPlayers;
    this._level = level;
    this._turn = turn ?? player1.value;
    this._cells = [
      new Cell(0),
      new Cell(1),
      new Cell(2),
      new Cell(3),
      new Cell(4),
      new Cell(5),
      new Cell(6),
      new Cell(7),
      new Cell(8),
    ];
  }

  public get id() {
    return this._id;
  }

  public get player1() {
    return this._player1;
  }

  public get player2() {
    return this._player2;
  }

  public get numberOfPlayers() {
    return this._numberOfPlayers;
  }

  public get level() {
    return this._level;
  }

  public getPlayer(v: Value | undefined) {
    if (!v) {
      return undefined;
    }

    if (this._player1.value === v) {
      return this._player1;
    } else {
      return this._player2;
    }
  }

  public getTurn() {
    return this._turn;
  }

  public getCurrentPlayer() {
    return this.getPlayer(this._turn);
  }

  public makeMove(index: Index) {
    if (this._cells[index].value !== undefined || this.finished() || this.hasWin()) {
      return;
    }
    this._cells[index].value = this._turn;
    this._turn = this._turn === 'O' ? 'X' : 'O';
  }

  public isSinglePlayerMode() {
    return this._numberOfPlayers === NumberOfPlayers.OnePlayer;
  }

  public getAvailableCells(): Index[] {
    return this._cells.reduce((availableCells, cell, index) => {
      if (!cell.value) {
        availableCells.push(index as Index);
      }
      return availableCells;
    }, [] as Index[]);
  }

  public getCell(index: Index) {
    return this._cells[index];
  }

  public hasWin(): boolean {
    const combs = [
      [this._cells[0], this._cells[1], this._cells[2]],
      [this._cells[3], this._cells[4], this._cells[5]],
      [this._cells[6], this._cells[7], this._cells[8]],
      [this._cells[0], this._cells[3], this._cells[6]],
      [this._cells[1], this._cells[4], this._cells[7]],
      [this._cells[2], this._cells[5], this._cells[8]],
      [this._cells[0], this._cells[4], this._cells[8]],
      [this._cells[2], this._cells[4], this._cells[6]],
    ];
    const classNameCombs: [string, string][] = [
      ['grid-horizontal-top', 'horizontal'],
      ['grid-horizontal-middle', 'horizontal'],
      ['grid-horizontal-bottom', 'horizontal'],
      ['grid-vertical-left', 'vertical'],
      ['grid-vertical-middle', 'vertical'],
      ['grid-vertical-right', 'vertical'],
      ['top-left-to-bottom-right', 'top-left-to-bottom-right'],
      ['top-right-to-bottom-left', 'top-right-to-bottom-left'],
    ];

    for (let i = 0; i < combs.length; i++) {
      const comb = combs[i];
      const result = comb.join('');
      if (result === 'OOO' || result === 'XXX') {
        const [gridClass, cellClass] = classNameCombs[i];
        this._gridClassNameWin = gridClass;
        this.winValue = result[0] as Value;
        for (const cell of comb) {
          cell.className = cellClass;
        }
        return true;
      }
    }
    return false;
  }

  public finished(): boolean {
    return this._cells.every((c) => Boolean(c.value));
  }

  public getGridClassNameWin() {
    return this._gridClassNameWin;
  }

  public clone(): Game {
    const game = new Game(this._player1, this._player2, this._numberOfPlayers, this._level);
    this._cells.forEach((c, i) => {
      game._cells[i] = c.clone();
    });
    game._gridClassNameWin = this._gridClassNameWin;
    game.winValue = this.winValue;
    game._turn = this._turn;
    return game;
  }

  public toArchived(): ArchivedGame {
    return {
      player1: this._player1.toArchived(),
      player2: this._player2.toArchived(),
      cells: this._cells.map((c) => c.toArchived()),
      gridClassNameWin: this._gridClassNameWin,
      winValue: this.winValue,
      numberOfPlayers: this._numberOfPlayers,
      level: this._level,
    };
  }

  static fromArchived(archivedGame: ArchivedGame): Game {
    const game = new Game(
      Player.fromArchived(archivedGame.player1),
      Player.fromArchived(archivedGame.player2),
      archivedGame.numberOfPlayers,
      archivedGame.level,
    );

    archivedGame.cells.forEach((c, i) => {
      const cell = game.getCell(i as Index);
      cell.value = c.value;
      cell.className = c.className;
    });

    game._gridClassNameWin = archivedGame.gridClassNameWin;
    game.winValue = archivedGame.winValue;

    return game;
  }
}
