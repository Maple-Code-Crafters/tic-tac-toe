import type { GameConfig } from '../../slices/gameSlice';
import type { Index } from '../Game';
import { Game, Level, NumberOfPlayers, PlayerTurn } from '../Game';
import { Minimax } from './Minimax';

describe('Minimax', () => {
  const minimax: Minimax = new Minimax();
  const config: GameConfig = {
    id: 'fakeId',
    player1: {
      name: 'Player 1',
      value: 'O',
      isCpu: false,
    },
    player2: {
      name: 'Player 2',
      value: 'X',
      isCpu: true,
    },
    numberOfPlayers: NumberOfPlayers.OnePlayer,
    level: Level.Hard,
    initialPlayerTurn: PlayerTurn.Player1,
  };
  let game: Game;

  beforeEach(() => {
    game = new Game(config);
  });

  test('should choose to win the game', () => {
    game.getCell(0).value = 'X';
    game.getCell(2).value = 'X';
    game.getCell(3).value = 'O';
    game.getCell(5).value = 'O';
    expect(minimax.chooseMove(game)).toBe(1 as Index);
  });

  // TODO: fix blocking the adversary to win
  test.todo('should block the adversary to win', () => {
    game.getCell(0).value = 'X';
    game.getCell(3).value = 'O';
    game.getCell(5).value = 'O';
    game.getCell(6).value = 'X';
    expect(minimax.chooseMove(game)).toBe(4 as Index);
  });
});
