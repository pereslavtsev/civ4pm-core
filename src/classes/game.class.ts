import { ModManager } from '../mod.manager';
import Executable from './executable.class';
import execa from 'execa';
import debug from 'debug';

export class Game extends Executable {
  protected readonly debug = debug('game');

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
