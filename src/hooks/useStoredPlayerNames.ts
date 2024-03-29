import { useEffect, useState } from 'react';

import { DEFAULT_PLAYER_1_NAME, DEFAULT_PLAYER_2_NAME, PLAYER_1_KEY, PLAYER_2_KEY } from '../constants';
import { StorageService } from '../helpers/storage.helper';

export const useStoredPlayerNames = () => {
  const [storedPlayer1Name, setStoredPlayer1Name] = useState('');
  const [storedPlayer2Name, setStoredPlayer2Name] = useState('');

  useEffect(() => {
    (async () => {
      const [storedPlayer1, storedPlayer2] = await Promise.all([
        StorageService.get(PLAYER_1_KEY),
        StorageService.get(PLAYER_2_KEY),
      ]);
      setStoredPlayer1Name(storedPlayer1 ?? DEFAULT_PLAYER_1_NAME);
      setStoredPlayer2Name(storedPlayer2 ?? DEFAULT_PLAYER_2_NAME);
    })();
  }, []);

  const savePlayer1Name = (name: string) => {
    setStoredPlayer1Name(name);
    StorageService.save(PLAYER_1_KEY, name);
  };

  const savePlayer2Name = (name: string) => {
    setStoredPlayer2Name(name);
    StorageService.save(PLAYER_2_KEY, name);
  };

  return { storedPlayer1Name, savePlayer1Name, storedPlayer2Name, savePlayer2Name } as const;
};
