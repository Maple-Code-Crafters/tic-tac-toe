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
export const BOT_THINKING_IMAGE = "data:image/jpeg;base64,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";
