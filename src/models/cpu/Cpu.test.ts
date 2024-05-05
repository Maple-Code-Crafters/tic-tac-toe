import type { GameConfig } from '../../slices/gameSlice';
import type { Index } from '../Game';
import { Game, NumberOfPlayers, PlayerTurn } from '../Game';
import { Level } from '../Game';
import { CPU } from './Cpu';
import type { CpuAlgorithm } from './CpuAlgorithm';
import { Minimax } from './Minimax';
import { RandomMove } from './RandomMove';

describe('Cpu', () => {
  let cpu: CPU;
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
    level: Level.Easy,
    initialPlayerTurn: PlayerTurn.Player1,
  };
  let game: Game;

  beforeEach(() => {
    cpu = new CPU(config.level);
    game = new Game(config);
  });

  test('should initialize correctly', () => {
    expect(cpu).toBeDefined();
  });

  test('should choose a move correctly', () => {
    cpu.EASY_LEVEL_THRESHOLD = 0;
    const move: Index | undefined = cpu.chooseMove(game);
    expect(game.getAvailableCells()).toContain(move);
  });

  test('should return a RandomMove instance', () => {
    const randomValue = 0.3;
    const threshold = 0.2;
    const cpuAlgorithm: CpuAlgorithm = cpu['getAlgorithm'](randomValue, threshold);
    expect(cpuAlgorithm).toBeInstanceOf(RandomMove);
  });

  test('should return a Minimax instance', () => {
    const randomValue = 0.1;
    const threshold = 0.2;
    const cpuAlgorithm: CpuAlgorithm = cpu['getAlgorithm'](randomValue, threshold);
    expect(cpuAlgorithm).toBeInstanceOf(Minimax);
  });

  test('should throw an error if an invalid level is passed', () => {
    const cpu = new CPU('' as Level);
    expect(() => cpu.chooseMove(game)).toThrowError('Invalid level');
  });
});
