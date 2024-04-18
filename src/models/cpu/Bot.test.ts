import { Bot } from './CpuAlgorithm';

describe('Bot', () => {
  let bot: Bot;
  let game: any;

  beforeEach(() => {
    bot = new Bot();
    game = {
      finished: () => false,
      hasWin: () => false,
      getAvailableCells: () => [0, 1, 2, 3, 4, 5, 6, 7, 8],
    };
  });

  test('should make a move', () => {
    const move = bot.chooseMove(game);
    expect(move).toBeGreaterThanOrEqual(0);
  });

  test('should return -1 if game is finished', () => {
    game.finished = () => true;
    const move = bot.chooseMove(game);
    expect(move).toBeUndefined();
  });

  test('should return -1 if game has a win', () => {
    game.hasWin = () => true;
    const move = bot.chooseMove(game);
    expect(move).toBeUndefined();
  });

  test('should return -1 if no available cells', () => {
    game.getAvailableCells = () => [];
    const move = bot.chooseMove(game);
    expect(move).toBeUndefined();
  });
});
