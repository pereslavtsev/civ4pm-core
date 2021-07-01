import path from 'path';
import fs from 'fs';
import Mod from './classes/mod.class';
import fg, { Entry } from 'fast-glob';
import Executable from './classes/executable.class';
import debug from 'debug';
import StreamZip from 'node-stream-zip';
import { ModInstallOptions } from './interfaces/mod-install-options.interface';

export class ModManager extends Executable {
  protected readonly debug = debug('game:mod');

  protected get modsFolder(): string {
    const folder = path.resolve(this.path, './Mods');
    this.debug('modsFolder: %s', folder);
    return folder;
  }

  async install(o: ModInstallOptions): Promise<void> {
    const zip = new StreamZip.async({ file: o.package });

    const entries = await zip.entries();
    const configEntry = Object.values(entries).find((entry) =>
      /[^/]+\.ini$/.test(entry.name)
    );
    this.debug('configEntry %o', configEntry);

    if (!configEntry) {
      await zip.close();
      throw new Error('config has not found');
    }

    const matches = configEntry.name.match(/[^/]+\.ini$/);
    this.debug('matches', matches);
    const extractPath = configEntry.name.replace(matches[0], '');
    this.debug('extractPath', extractPath);

    // extract into folder
    if (o.onExtract) {
      zip.on('extract', o.onExtract);
    }
    await zip.extract(extractPath, path.join(this.modsFolder, o.folderName));
    await zip.close();
  }

  async create(name: string): Promise<void> {
    await fs.promises.mkdir(path.join(this.modsFolder, name));
  }

  async remove(name: string): Promise<void> {
    return fs.promises.rm(path.join(this.modsFolder, name), {
      recursive: true,
    });
  }

  async get(name: string): Promise<Mod> {
    const dir = path.join(this.modsFolder, name);
    if (!fs.existsSync(dir)) {
      throw new Error("Folder doesn't exists");
    }
    this.debug('dir: %s', dir);
    const stream = fg.stream('*.ini', {
      cwd: dir,
      objectMode: true,
      absolute: true,
      onlyFiles: true,
    });
    for await (const entry of stream) {
      const fileEntry = entry as unknown as Entry;
      this.debug('fileEntry: %o', fileEntry);
      return new Mod(fileEntry.path);
    }
    throw new Error("Config file doesn't exists");
  }

  async list(): Promise<Mod[]> {
    const stream = fg.stream('**/*.ini', {
      deep: 2,
      cwd: this.modsFolder,
      objectMode: true,
      absolute: true,
      onlyFiles: true,
    });
    const mods = [];
    for await (const entry of stream) {
      const fileEntry = entry as unknown as Entry;
      this.debug('fileEntry: %o', fileEntry);
      mods.push(new Mod(fileEntry.path));
    }
    return mods;
  }
}
