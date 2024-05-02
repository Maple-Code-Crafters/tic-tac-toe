import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '.';

import { CPU_THINKING_TIME } from '../constants';
import type { Game, Index } from '../models/Game';

export const useCpuCellAnimation = (game: Game) => {
  const cpuThinking = useAppSelector((state) => state.cpu.thinking);
  const [animatedCellIndex, setAnimatedCellIndex] = useState<Index>();

  const setNextAnimatedCell = useCallback(() => {
    const availableCells = game?.getAvailableCells() ?? [];
    if (animatedCellIndex === undefined) {
      setAnimatedCellIndex(availableCells[0]);
    } else {
      const index = availableCells.indexOf(animatedCellIndex as Index);
      setAnimatedCellIndex(availableCells[(index + 1) % availableCells.length]);
    }
  }, [animatedCellIndex, game]);

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
