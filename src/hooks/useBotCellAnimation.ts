import { useCallback, useEffect, useState } from 'react';

import { BOT_THINKING_TIME } from '../constants';
import type { Game, Index } from '../models/Game';

export const useBotCellAnimation = ({ botIsThinking, game }: { botIsThinking: boolean; game: Game }) => {
  const [animatedCellIndex, setAnimatedCellIndex] = useState<Index>();

  const setNextAnimatedCell = useCallback(() => {
    const index = game.getAvailableCells().indexOf(animatedCellIndex as Index);
    setAnimatedCellIndex(game.getAvailableCells()[index === -1 ? 0 : index + 1]);
  }, [animatedCellIndex, game]);

  useEffect(() => {
    let setIntervalId: NodeJS.Timeout | undefined = undefined;
    if (botIsThinking) {
      setIntervalId = setInterval(() => {
        setNextAnimatedCell();
      }, BOT_THINKING_TIME / 10);
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
