import type { Game, Index } from '../Game';

export interface CpuAlgorithm {
  chooseMove(game: Game): Index | undefined;
}
