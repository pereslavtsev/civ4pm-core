import { Game } from '../classes/game.class';
import debug from 'debug';
import regedit from 'regedit';

export class GameManager {
  protected readonly debug = debug('civ4pm');

  async list() {
    const basePath = 'HKLM\\SOFTWARE\\WOW6432Node\\Firaxis Games';
    const regeditList = (paths) =>
      new Promise((resolve, reject) => {
        regedit.list(paths, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
    const result = (await regeditList(basePath)) as { keys: string[] };
    if (!(basePath in result)) {
      this.debug('no firaxis key founded, skipped');
      return null;
    }
    const { keys } = result[basePath];
    const paths = keys.map((key) => `${basePath}\\${key}`);
    const result2 = await regeditList(paths);
    const games = Object.entries(result2).map(([key, { values }]) => {
      const installPath = values?.INSTALLDIR?.value;
      if (key.match(/Civilization 4$/)) {
        return Game.Vanilla(installPath);
      }
      if (key.includes('Beyond the Sword')) {
        return Game.BtS(installPath);
      }
    });
    this.debug('games:', games);
    return games;
  }
}
