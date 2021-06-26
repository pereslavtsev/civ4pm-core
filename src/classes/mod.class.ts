import ini from 'ini';
import fs from 'fs';
import path from 'path';
import { ModConfig } from '../interfaces/mod-config.interface';
import debug from 'debug';

export default class Mod {
  protected readonly path: string;
  protected readonly configFile: string;
  protected readonly folder: string;
  protected readonly debug = debug('mod');

  constructor(configFilePath: string) {
    this.debug('configFilePath: %s', configFilePath);
    const { base, dir } = path.parse(configFilePath);
    const { name } = path.parse(dir);
    this.path = dir;
    this.configFile = base;
    this.folder = name;
    this.debug('this: %o', this);
  }

  protected get configFilePath(): string {
    return path.resolve(this.path, this.configFile);
  }

  /**
   * Get mod config
   */
  async getConfig(): Promise<ModConfig> {
    const data = await fs.promises.readFile(this.configFilePath);
    const parsed = ini.parse(data.toString());
    this.debug('parsed: %o', parsed);
    const config = Object.fromEntries(
      Object.entries<string>(parsed?.CONFIG).map(([k, v]) => [
        k,
        ['0', '1'].includes(v) ? !!+v : v,
      ])
    ) as unknown as ModConfig;
    this.debug('config: %o', config);
    return config;
  }
}
