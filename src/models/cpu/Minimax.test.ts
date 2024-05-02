import type { Index } from '../Game';
import { Game, Level, NumberOfPlayers } from '../Game';
import { Player } from '../Player';
import { Minimax } from './Minimax';

describe('Minimax', () => {
  const minimax: Minimax = new Minimax();
  let game: Game;

  beforeEach(() => {
    game = new Game(
      'fakeId',
      new Player('Player 1', 'X'),
      new Player('Player 2', 'O'),
      NumberOfPlayers.OnePlayer,
      Level.Hard,
    );
  });

  test('should choose to win the game', () => {
    game.getCell(0).value = 'X';
    game.getCell(2).value = 'X';
    game.getCell(3).value = 'O';
    game.getCell(5).value = 'O';
    expect(minimax.chooseMove(game)).toBe(1 as Index);
  });

  test('should block the adversary to win', () => {
    game.getCell(0).value = 'X';
    game.getCell(3).value = 'O';
    game.getCell(5).value = 'O';
    game.getCell(6).value = 'X';
    expect(minimax.chooseMove(game)).toBe(4 as Index);
  });
});
