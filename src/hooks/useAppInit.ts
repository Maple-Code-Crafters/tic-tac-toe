import { useEffect } from 'react';

export const useAppInit = () => {
  useEffect(() => {
    document.getElementById('loader')?.remove();
  }, []);
};
