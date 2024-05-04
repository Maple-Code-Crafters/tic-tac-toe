import type { Index } from '../Game';
import { Game, NumberOfPlayers } from '../Game';
import { Level } from '../Game';
import { Player } from '../Player';
import { CPU } from './Cpu';
import type { CpuAlgorithm } from './CpuAlgorithm';
import { Minimax } from './Minimax';
import { RandomMove } from './RandomMove';

describe('Cpu', () => {
  let level: Level;
  let cpu: CPU;
  const player1 = new Player('Player 1', 'X');
  const player2 = new Player('Player 2', 'O');
  const numberOfPlayers: NumberOfPlayers = NumberOfPlayers.OnePlayer;
  let game: Game;

  beforeEach(() => {
    level = Level.Easy;
    cpu = new CPU(level);
    game = new Game('fakeId', player1, player2, numberOfPlayers, level, 'X');
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
