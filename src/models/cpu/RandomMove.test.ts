import type { Game } from '../Game';
import { RandomMove } from './RandomMove';

describe('Bot', () => {
  let randomMove: RandomMove;
  let game: Game;

  beforeEach(() => {
    randomMove = new RandomMove();
    game = {
      finished: () => false,
      hasWin: () => false,
      getAvailableCells: () => [0, 1, 2, 3, 4, 5, 6, 7, 8],
    } as Game;
  });

  test('should make a move', () => {
    const move = randomMove.chooseMove(game);
    expect(move).toBeGreaterThanOrEqual(0);
  });

  test('should return undefined if game is finished', () => {
    game.finished = () => true;
    const move = randomMove.chooseMove(game);
    expect(move).toBeUndefined();
  });

  test('should return undefined if game has a win', () => {
    game.hasWin = () => true;
    const move = randomMove.chooseMove(game);
    expect(move).toBeUndefined();
  });

  test('should return undefined if no available cells', () => {
    game.getAvailableCells = () => [];
    const move = randomMove.chooseMove(game);
    expect(move).toBeUndefined();
  });
});
