import type { Index } from '../Game';
import { Level } from '../Game';
import { Cpu } from './Cpu';
import type { CpuAlgorithm } from './CpuAlgorithm';
import { Minimax } from './Minimax';
import { RandomMove } from './RandomMove';

describe('Cpu', () => {
  let cpu: Cpu;
  let game: any;
  let level: Level;

  beforeEach(() => {
    level = Level.Easy;
    cpu = new Cpu(level);
    game = {
      finished: () => false,
      hasWin: () => false,
      clone: () => game,
      getAvailableCells: () => [0, 1, 2, 3, 4, 5, 6, 7, 8],
    };
  });

  test('should initialize correctly', () => {
    expect(cpu).toBeDefined();
  });

  test('should choose a move correctly', () => {
    cpu['EASY_LEVEL_THRESHOLD'] = 0;
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
    const cpu = new Cpu('' as Level);
    expect(() => cpu.chooseMove(game)).toThrowError('Invalid level');
  });
});
