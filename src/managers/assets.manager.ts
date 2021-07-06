import Executable from '../classes/executable.class';
import debug from 'debug';
import { XmlManager } from './xml.manager';

export class AssetsManager extends Executable {
  protected readonly debug = debug('game:assets');

  get xml(): XmlManager {
    return new XmlManager(this.path);
  }
}
