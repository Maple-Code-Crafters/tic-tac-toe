import { Preferences } from '@capacitor/preferences';

import { logError } from '.';

import { DEFAULT } from '../constants';
import type { ArchivedGame, Level, NumberOfPlayers } from '../models/Game';
import { Game } from '../models/Game';

export type Symbols = {
  X: string;
  O: string;
};

export type PlayedGame = {
  date: Date;
  game: Game;
  symbols: Symbols;
};

type SavedGame = {
  date: string;
  game: ArchivedGame;
  symbols: Symbols;
};

export type Default = {
  player1Name: string;
  player2Name: string;
  symbols: Symbols;
  numberOfPlayers: NumberOfPlayers;
  level: Level;
};

export const GameStorage = {
  saveGame: async ({ date, game, symbols }: PlayedGame) => {
    try {
      const { value } = await Preferences.get({ key: 'results' });
      const results: SavedGame[] = value ? JSON.parse(value) : [];
      results.unshift({
        date: date.toISOString(),
        game: game.toArchived(),
        symbols,
      });
      await Preferences.set({
        key: 'results',
        value: JSON.stringify(results),
      });
    } catch (error) {
      logError(error, ['GameStorage.saveGame']);
    }
  },

  getResults: async () => {
    try {
      const { value } = await Preferences.get({ key: 'results' });
      const results: SavedGame[] = value ? JSON.parse(value) : [];
      return results.map<PlayedGame>(({ date, game, symbols }) => ({
        date: new Date(date),
        game: Game.fromArchived(game),
        symbols,
      }));
    } catch (error) {
      logError(error, ['GameStorage.getResults']);
      return [];
    }
  },

  deteleAll: () => Preferences.remove({ key: 'results' }),

  deteleOne: async (game: PlayedGame) => {
    try {
      const { value } = await Preferences.get({ key: 'results' });
      const results: SavedGame[] = value ? JSON.parse(value) : [];
      const newResults = results.filter(({ date }) => date !== game.date.toISOString());
      await Preferences.set({
        key: 'results',
        value: JSON.stringify(newResults),
      });
    } catch (error) {
      logError(error, ['GameStorage.deteleOne']);
    }
  },
};

export const DefaultStorage = {
  save: (data: Default) => {
    const value = JSON.stringify(data);
    return Preferences.set({ key: 'default', value });
  },

  get: async () => {
    try {
      const { value } = await Preferences.get({ key: 'default' });
      return value ? (JSON.parse(value) as Default) : DEFAULT;
    } catch (error) {
      logError(error, ['DefaultStorage.get']);
      return DEFAULT;
    }
  },
};
