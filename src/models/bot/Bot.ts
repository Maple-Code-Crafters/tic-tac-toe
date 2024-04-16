import type { Game, Index } from '../Game';

export interface Bot {
  chooseMove(game: Game): Index | undefined;
}
