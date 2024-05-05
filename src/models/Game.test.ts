import type { GameConfig } from '../slices/gameSlice';
import { Cell } from './Cell';
import type { ArchivedGame } from './Game';
import { Game, Level, NumberOfPlayers, PlayerTurn } from './Game';
import { Player } from './Player';

describe('Game', () => {
  const config: GameConfig = {
    id: 'fakeId',
    player1: {
      name: 'Player 1',
      value: 'X',
      isCpu: false,
    },
    player2: {
      name: 'Player 2',
      value: 'O',
      isCpu: false,
    },
    numberOfPlayers: NumberOfPlayers.OnePlayer,
    level: Level.Easy,
    initialPlayerTurn: PlayerTurn.Player1,
  };
  let player1: Player;
  let player2: Player;
  let game: Game;

  beforeEach(() => {
    player1 = new Player(config.player1);
    player2 = new Player(config.player2);
    game = new Game(config);
  });

  test('should initialize with correct players', () => {
    expect(game.player1).toBe(player1);
    expect(game.player2).toBe(player2);
  });

  test('should initialize with empty cells', () => {
    const cells = game['_cells'];
    expect(cells.every((cell) => cell.value === undefined)).toBe(true);
  });

  test('should return correct player based on value', () => {
    const playerX = game.getPlayer('X');
    const playerO = game.getPlayer('O');
    expect(playerX).toBe(player1);
    expect(playerO).toBe(player2);
  });

  test('should return correct cell based on index', () => {
    const cell = game.getCell(0);
    expect(cell).toBeInstanceOf(Cell);
    expect(cell.index).toBe(0);
  });

  test('should detect win correctly', () => {
    const cells = game['_cells'];

    // Set up a winning combination
    cells[0].value = 'X';
    cells[1].value = 'X';
    cells[2].value = 'X';

    expect(game.hasWin()).toBe(true);
    expect(game.winValue).toBe('X');
    expect(game.getGridClassNameWin()).toBe('grid-horizontal-top');
    expect(cells[0].className).toBe('horizontal');
    expect(cells[1].className).toBe('horizontal');
    expect(cells[2].className).toBe('horizontal');
  });

  test('should detect draw correctly', () => {
    const cells = game['_cells'];

    // Set up a draw scenario
    cells[0].value = 'X';
    cells[1].value = 'O';
    cells[2].value = 'X';
    cells[3].value = 'O';
    cells[4].value = 'X';
    cells[5].value = 'O';
    cells[6].value = 'O';
    cells[7].value = 'X';
    cells[8].value = 'O';

    expect(game.finished()).toBe(true);
  });

  test('should convert game to archived format correctly', () => {
    const archivedGame = game.toArchived();

    expect(archivedGame.config.id).toEqual(config.id);
    expect(archivedGame.config.player1).toEqual(player1.toConfig());
    expect(archivedGame.config.player1).toEqual(player2.toConfig());
    expect(archivedGame.cells.length).toBe(9);
    expect(archivedGame.gridClassNameWin).toBeUndefined();
    expect(archivedGame.winValue).toBeUndefined();
  });

  test('should create game from archived format correctly', () => {
    const archivedGame: ArchivedGame = {
      config,
      cells: [
        { index: 0, value: 'X', className: 'horizontal' },
        { index: 1, value: 'O', className: 'vertical' },
        { index: 2, value: 'X', className: 'horizontal' },
        { index: 3, value: 'O', className: 'vertical' },
        { index: 4, value: 'X', className: 'horizontal' },
        { index: 5, value: 'O', className: 'vertical' },
        { index: 6, value: 'O', className: 'top-left-to-bottom-right' },
        { index: 7, value: 'X', className: 'top-right-to-bottom-left' },
        { index: 8, value: 'O', className: 'top-left-to-bottom-right' },
      ],
      gridClassNameWin: 'grid-horizontal-top',
      winValue: 'X',
    };

    const newGame = Game.fromArchived(archivedGame);

    expect(newGame.id).toEqual(config.id);
    expect(newGame.player1).toEqual(player1);
    expect(newGame.player2).toEqual(player2);
    expect(newGame.numberOfPlayers).toBe(config.numberOfPlayers);
    expect(newGame.level).toBe(config.level);
    expect(newGame.toConfig().initialPlayerTurn).toBe(config.initialPlayerTurn);
    expect(newGame.getCell(0).value).toBe('X');
    expect(newGame.getCell(0).className).toBe('horizontal');
    expect(newGame.getCell(1).value).toBe('O');
    expect(newGame.getCell(1).className).toBe('vertical');
    expect(newGame.getCell(2).value).toBe('X');
    expect(newGame.getCell(2).className).toBe('horizontal');
    expect(newGame.getCell(3).value).toBe('O');
    expect(newGame.getCell(3).className).toBe('vertical');
    expect(newGame.getCell(4).value).toBe('X');
    expect(newGame.getCell(4).className).toBe('horizontal');
    expect(newGame.getCell(5).value).toBe('O');
    expect(newGame.getCell(5).className).toBe('vertical');
    expect(newGame.getCell(6).value).toBe('O');
    expect(newGame.getCell(6).className).toBe('top-left-to-bottom-right');
    expect(newGame.getCell(7).value).toBe('X');
    expect(newGame.getCell(7).className).toBe('top-right-to-bottom-left');
    expect(newGame.getCell(8).value).toBe('O');
    expect(newGame.getCell(8).className).toBe('top-left-to-bottom-right');
    expect(newGame.getGridClassNameWin()).toBe('grid-horizontal-top');
    expect(newGame.winValue).toBe('X');
  });
});
