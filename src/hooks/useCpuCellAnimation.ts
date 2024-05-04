import { useCallback, useEffect, useState } from 'react';

import { CPU_THINKING_TIME } from '../constants';
import type { Index } from '../models/Game';

export const useCpuCellAnimation = (availableCells: Index[], cpuThinking: boolean) => {
  const [animatedCellIndex, setAnimatedCellIndex] = useState<Index>();

  const setNextAnimatedCell = useCallback(() => {
    if (animatedCellIndex === undefined) {
      setAnimatedCellIndex(availableCells[0]);
    } else {
      const index = availableCells.indexOf(animatedCellIndex as Index);
      setAnimatedCellIndex(availableCells[(index + 1) % availableCells.length]);
    }
  }, [animatedCellIndex, availableCells]);

  useEffect(() => {
    let setIntervalId: NodeJS.Timeout | undefined = undefined;
    if (cpuThinking) {
      setIntervalId = setInterval(setNextAnimatedCell, CPU_THINKING_TIME / 10);
    } else {
      setAnimatedCellIndex(undefined);
      clearInterval(setIntervalId);
    }

    return () => {
      clearInterval(setIntervalId);
    };
  }, [setNextAnimatedCell, cpuThinking]);

  return { animatedCellIndex } as const;
};
