import {readFileSync} from 'fs';

export interface FileHandler {
  readFile(path: string): Promise<string>;
}

export function createFileHandler(): FileHandler {
  return {
    async readFile(path): Promise<string> {
      return readFileSync(path, 'utf8');
    },
  };
}
