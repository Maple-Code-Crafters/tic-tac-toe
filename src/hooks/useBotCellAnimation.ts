import { useCallback, useEffect, useState } from 'react';

import { BOT_THINKING_TIME } from '../constants';
import type { Game, Index } from '../models/Game';

export const useBotCellAnimation = ({ botIsThinking, game }: { botIsThinking: boolean; game: Game }) => {
  const [animatedCellIndex, setAnimatedCellIndex] = useState<Index>();

  const setNextAnimatedCell = useCallback(() => {
    const availableCells = game.getAvailableCells();
    if (animatedCellIndex === undefined) {
      setAnimatedCellIndex(availableCells[0]);
    } else {
      const index = availableCells.indexOf(animatedCellIndex as Index);
      setAnimatedCellIndex(availableCells[(index + 1) % availableCells.length]);
    }
  }, [animatedCellIndex, game]);

  useEffect(() => {
    let setIntervalId: NodeJS.Timeout | undefined = undefined;
    if (botIsThinking) {
      setIntervalId = setInterval(setNextAnimatedCell, BOT_THINKING_TIME / 10);
    } else {
      setAnimatedCellIndex(undefined);
      clearInterval(setIntervalId);
    }

    return () => {
      clearInterval(setIntervalId);
    };
  }, [setNextAnimatedCell, botIsThinking]);

  return { animatedCellIndex } as const;
};
