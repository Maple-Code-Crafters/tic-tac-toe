import { type Game, type Index, Level } from '../Game';
import type { Bot } from './Bot';
import { BotBuilder } from './BotBuilder';

export class MediumBot implements Bot {
  public chooseMove(game: Game): Index | undefined {
    // const flippedCoin = Math.floor(Math.random() * 2);
    // console.log('flippedCoin', flippedCoin);
    // if (flippedCoin === 0) {
    //   return BotBuilder.build(Level.Easy).chooseMove(game);
    // } else {
    //   return BotBuilder.build(Level.Hard).chooseMove(game);
    // }

    const availableCells = game.getAvailableCells();
    if ((availableCells.length / 2) % 2 === 0) {
      return BotBuilder.build(Level.Easy).chooseMove(game);
    } else {
      return BotBuilder.build(Level.Hard).chooseMove(game);
    }
  }
}
