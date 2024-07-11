import type { Default } from '../helpers/storage.helper';
import { Level, NumberOfPlayers } from '../models/Game';

export const APP_VERSION = '1.0.0';
export const APP_NAME = 'Maple Tic-Tac-Toe';
export const DEFAULT: Default = {
  player1Name: 'Player 1',
  player2Name: 'Player 2',
  symbols: {
    O: 'O',
    X: 'X',
  },
  numberOfPlayers: NumberOfPlayers.OnePlayer,
  level: Level.Easy,
};
export const CPU_THINKING_TIME = 1000;
