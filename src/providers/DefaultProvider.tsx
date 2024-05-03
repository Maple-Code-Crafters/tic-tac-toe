import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import type { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import { DefaultStorage } from '../helpers/storage.helper';
import { setGameDefault } from '../slices/gameSlice';

export const DefaultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const [restored, setRestored] = useState(false);

  const retrieve = useCallback(async () => {
    const storedDefault = await DefaultStorage.get();
    dispatch(setGameDefault(storedDefault));
    setRestored(true);
  }, [dispatch]);

  useEffect(() => {
    retrieve();
  }, [retrieve]);

  if (!restored) return null;
  return children;
};

DefaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
