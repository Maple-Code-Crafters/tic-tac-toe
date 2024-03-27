import type { ArchivedPlayer } from './Player';
import { Player } from './Player';

describe('Player', () => {
  const playerName = 'Player 1';
  const playerValue = 'X';

  let player: Player;

  beforeEach(() => {
    player = new Player(playerName, playerValue);
  });

  test('should have correct name', () => {
    expect(player.name).toBe(playerName);
  });

  test('should have correct value', () => {
    expect(player.value).toBe(playerValue);
  });

  test('should convert player to archived format correctly', () => {
    const archivedPlayer = player.toArchived();

    expect(archivedPlayer.name).toBe(playerName);
    expect(archivedPlayer.value).toBe(playerValue);
  });

  test('should create player from archived format correctly', () => {
    const archivedPlayer: ArchivedPlayer = { name: playerName, value: playerValue };
    const newPlayer = Player.fromArchived(archivedPlayer);

    expect(newPlayer.name).toBe(playerName);
    expect(newPlayer.value).toBe(playerValue);
  });
});
