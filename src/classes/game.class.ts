import { ModManager } from '../managers/mod.manager';
import Executable from './executable.class';
import execa from 'execa';
import debug from 'debug';
import { AssetsManager } from '../managers/assets.manager';
import { GameType } from '../enums/game-type.enum';

export class Game extends Executable {
  protected readonly debug = debug('game');

  public readonly type: GameType;

  protected static Type = GameType;

  static Vanilla(path: string): Game {
    return new Game(path, Game.Type.VANILLA);
  }

  static Warlords(path: string): Game {
    return new Game(path, Game.Type.WARLORDS);
  }

  static BeyondTheSword(path: string): Game {
    return new Game(path, Game.Type.BEYOND_THE_SWORD);
  }

  static BtS(path: string): Game {
    return Game.BeyondTheSword(path);
  }

  protected constructor(path: string, type: GameType) {
    super(path);
    this.type = type;
  }

  get assets(): AssetsManager {
    return new AssetsManager(this.path);
  }

  get mod(): ModManager {
    return new ModManager(this.path);
  }

  async run(mod?: string): Promise<void> {
    const args = ['/c', `${this.path}\\Civ4BeyondSword.exe`];
    if (mod) {
      this.debug('mod: %s', mod);
      args.push(`mod=\\${mod}`);
    }
    this.debug('args', ...args);
    const exe = execa('cmd', args, {
      detached: true,
    });
    try {
      this.debug('running the game...');
      await exe;
    } catch (e) {
      this.debug('e: %o', e);
    } finally {
      this.debug('exe: %o', exe);
    }
  }

  async close(): Promise<void> {
    try {
      await execa('taskkill', ['/IM', 'Civ4BeyondSword.exe']);
    } catch (error) {
      this.debug('error: %o', error);
    }
  }
}
