import fg, { Entry } from 'fast-glob';
import * as driveList from 'drivelist';
import mergeStream from 'merge-stream';
import { Game } from '../classes/game.class';
import debug from 'debug';

interface ScanningOptions {
  onSearch: (entry: Entry) => void;
}

export class GameManager {
  protected readonly debug = debug('civ4pm');

  async scan(o: ScanningOptions): Promise<Game[]> {
    const createGlobStream = (path: string) => {
      return fg.stream('**/(Civilization4|Civ4BeyondSword).exe', {
        absolute: true,
        cwd: path,
        onlyFiles: true,
        objectMode: true,
        suppressErrors: true,
      });
    };

    const drives = await driveList.list();
    const mountPoints = drives.map((drive) => drive.mountpoints).flat();
    const streams = mountPoints.map(({ path }) => createGlobStream(path));

    const games: Game[] = [];

    for await (const entry of mergeStream(...streams)) {
      const fileEntry = entry as unknown as Entry;
      this.debug('fileEntry: %o', fileEntry);
      if (typeof o?.onSearch === 'function') {
        o.onSearch(fileEntry);
      }

      games.push(Game.Vanilla(fileEntry.path));
    }

    this.debug('games', games);

    return games;
  }
}
