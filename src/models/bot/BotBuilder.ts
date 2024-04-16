import { Level } from '../Game';
import type { Bot } from './Bot';
import { EasyBot } from './EasyBot';
import { HardBot } from './HardBot';
import { MediumBot } from './MediumBot';

export class BotBuilder {
  static build(level: Level): Bot {
    switch (level) {
      case Level.Easy:
        return new EasyBot();
      case Level.Medium:
        return new MediumBot();
      case Level.Hard:
        return new HardBot();
      default:
        throw new Error('Invalid level');
    }
  }
}
