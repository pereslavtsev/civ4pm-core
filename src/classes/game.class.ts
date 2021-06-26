import { ModManager } from '../mod.manager';
import Executable from './executable.class';

export class Game extends Executable {
  get mod(): ModManager {
    return new ModManager(this.path);
  }
}
