import { Preferences } from '@capacitor/preferences';

import { DEFAULT } from '../constants';
import type { ArchivedGame } from '../models/Game';
import { Game } from '../models/Game';

export type StoredGame = {
  date: Date;
  game: Game;
};

export type Default = {
  player1Name: string;
  player1Symbol: string;
  player2Name: string;
  player2Symbol: string;
};

export const GameStorage = {
  saveGame: (date: Date, game: Game) => {
    return Preferences.set({
      key: date.toISOString(),
      value: JSON.stringify(game.toArchived()),
    });
  },

  getAllDescOrder: async () => {
    const storedGames: StoredGame[] = [];
    const { keys } = await Preferences.keys();

    for (const key of keys) {
      const { value } = await Preferences.get({ key });

      if (value) {
        const recoveredGame = JSON.parse(value) as ArchivedGame;
        storedGames.push({
          date: new Date(key),
          game: Game.fromArchived(recoveredGame),
        });
      }
    }

    return storedGames.sort((a, b) => b.date.getTime() - a.date.getTime());
  },

  deteleAll: Preferences.clear,

  deteleOne: (key: string) => Preferences.remove({ key }),
};

export const DefaultStorage = {
  save: (data: Default) => {
    const value = JSON.stringify(data);
    return Preferences.set({ key: 'default', value });
  },

  get: async () => {
    const { value } = await Preferences.get({ key: 'default' });
    try {
      return value ? (JSON.parse(value) as Default) : DEFAULT;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error parsing default preferences', error);
      return DEFAULT;
    }
  },
};
