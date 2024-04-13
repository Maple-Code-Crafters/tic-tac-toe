import type { Default } from '../helpers/storage.helper';
import { NumberOfPlayers } from '../models/Game';

export const APP_VERSION = '0.0.0';
export const APP_NAME = 'tic-tac-toe';
export const DEFAULT: Default = {
  player1Name: 'Player 1',
  player2Name: 'Player 2',
  symbols: {
    O: 'O',
    X: 'X',
  },
  numberOfPlayers: NumberOfPlayers.OnePlayer,
};
export const BOT_THINKING_TIME = 1000;
