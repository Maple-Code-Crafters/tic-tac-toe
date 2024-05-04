import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import type { ReactNode } from 'react';

import { useAppDispatch } from '../hooks';
import { retriveAsyncDefault } from '../slices/gameSlice';

export const DefaultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [restored, setRestored] = useState(false);

  const retrieve = useCallback(async () => {
    dispatch(retriveAsyncDefault());
    setRestored(true);
  }, [dispatch]);

  useEffect(() => {
    retrieve();
  }, [retrieve]);

  return restored ? children : null;
};

DefaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
