import type { PlayerConfig } from '../slices/gameSlice';
import { Player } from './Player';

describe('Player', () => {
  const config: PlayerConfig = {
    name: 'Player 1',
    value: 'X',
    isCpu: false,
  };

  let player: Player;

  beforeEach(() => {
    player = new Player(config);
  });

  test('should have correct name', () => {
    expect(player.name).toBe(config.name);
  });

  test('should have correct value', () => {
    expect(player.value).toBe(config.value);
  });

  test('should have correct isCpu', () => {
    expect(player.isCpu).toBe(config.isCpu);
  });

  test('should convert player to archived format correctly', () => {
    const archivedPlayer = player.toConfig();

    expect(archivedPlayer.name).toBe(config.name);
    expect(archivedPlayer.value).toBe(config.value);
    expect(archivedPlayer.isCpu).toBe(config.isCpu);
  });

  test('should create player from archived format correctly', () => {
    const newPlayer = Player.fromConfig(config);

    expect(newPlayer.name).toBe(config.name);
    expect(newPlayer.value).toBe(config.value);
    expect(newPlayer.isCpu).toBe(config.isCpu);
  });
});
