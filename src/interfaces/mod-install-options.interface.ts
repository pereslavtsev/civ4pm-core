import { ZipEntry } from 'node-stream-zip';

export interface ModInstallOptions {
  package: string;
  folderName: string;
  onExtract?: (entry: ZipEntry, outPath: string) => void;
}
