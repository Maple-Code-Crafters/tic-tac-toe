import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { DEFAULT } from '../constants';
import type { Default } from '../helpers/storage.helper';
import { DefaultStorage } from '../helpers/storage.helper';

export const useStoredDefault = () => {
  const history = useHistory();
  const [restored, setRestored] = useState(false);
  const [storedDefault, setStoredDefault] = useState<Default>(DEFAULT);

  const retrieve = useCallback(async () => {
    const stored = await DefaultStorage.get();
    setStoredDefault(stored);
    setRestored(true);
  }, []);

  useEffect(() => {
    retrieve();
    const unlisten = history.listen(retrieve);
    return unlisten;
  }, [history, retrieve]);

  const saveDefault = (newDefault: Default) => {
    DefaultStorage.save(newDefault);
    setStoredDefault(newDefault);
  };

  return { restored, setRestored, storedDefault, saveDefault } as const;
};
