import {createFileHandler} from '../../src/utils/file-handler';
import * as fs from 'fs';
import * as path from 'path';

describe('FileHandler', () => {
  const testFilePath = path.join(__dirname, 'testFile.txt');
  const fileContent = 'Hello, world!';

  beforeAll(() => {
    fs.writeFileSync(testFilePath, fileContent);
  });

  afterAll(() => {
    fs.unlinkSync(testFilePath);
  });

  it('should read a file correctly', async () => {
    const fileHandler = createFileHandler();
    const content = await fileHandler.readFile(testFilePath);
    expect(content).toEqual(fileContent);
  });

  it('should throw an error if the file does not exist', async () => {
    const fileHandler = createFileHandler();
    const nonExistentFilePath = path.join(__dirname, 'nonExistentFile.txt');
    await expect(fileHandler.readFile(nonExistentFilePath)).rejects.toThrow();
  });
});
