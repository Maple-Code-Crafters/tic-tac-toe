import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { useAppDispatch } from '../hooks';
import { retrieveDefaultAsync } from '../slices/gameSlice';

export const DefaultProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [restored, setRestored] = useState(false);

  const retrieve = useCallback(async () => {
    await dispatch(retrieveDefaultAsync());
    setRestored(true);
  }, [dispatch]);

  useEffect(() => {
    retrieve();
  }, [retrieve]);

  return restored ? children : null;
};
