import { GameManager } from './game.manager';

export class PackageManager {
  get games(): GameManager {
    return new GameManager();
  }
}
