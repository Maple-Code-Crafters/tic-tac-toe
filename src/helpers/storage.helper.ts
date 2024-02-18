import { Preferences } from "@capacitor/preferences";
import { ArchivedGame, Game } from "../models/Game";

export type StoredGame = {
  date: Date;
  game: Game;
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
