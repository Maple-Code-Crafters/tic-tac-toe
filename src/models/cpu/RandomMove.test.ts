import type { GameConfig } from '../../slices/gameSlice';
import type { Index } from '../Game';
import { Game, Level, NumberOfPlayers, PlayerTurn } from '../Game';
import { RandomMove } from './RandomMove';

describe('Bot', () => {
  const config: GameConfig = {
    id: 'fakeId',
    player1: {
      name: 'Player 1',
      value: 'X',
      isCpu: true,
    },
    player2: {
      name: 'Player 2',
      value: 'O',
      isCpu: false,
    },
    numberOfPlayers: NumberOfPlayers.OnePlayer,
    level: Level.Hard,
    initialPlayerTurn: PlayerTurn.Player1,
  };
  const testCases: Index[][] = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 5, 6, 8],
    [0, 1, 3, 6, 7, 8],
    [0, 1, 5, 7, 8],
    [3, 4, 5, 6, 7, 8],
    [0, 1, 2, 5, 6, 7, 8],
    [0, 1, 8],
    [0, 2],
    [1],
  ];
  let randomMove: RandomMove;
  let game: Game;

  beforeEach(() => {
    randomMove = new RandomMove();
    game = new Game(config);
  });

  test.each(testCases)('should make a correct move within available cells. Test case %#', (...args) => {
    game.getAvailableCells = () => args;
    const move = randomMove.chooseMove(game);
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThan(9);
    expect(args).toContain(move);
  });
});
