const fs = require('fs');

jest.mock('fs');

describe('tests mock fs module', () => {
  beforeEach(() => {
    fs.restore();
  });

  it('should create a file', () => {
    fs.writeFileSync('path/to/file1.txt', 'eita poarr');

    const files = fs.readdirSync('path/to');

    expect(files.length).toBe(1);
  });

  it('should create multiple files', () => {
    const EXPECTED_NUMBER_OF_FILES = 5;

    for (let i = 0; i < (EXPECTED_NUMBER_OF_FILES); i += 1) {
      fs.writeFileSync(`path/to/file${i}.txt`, `content #${i}`);
    }

    const files = fs.readdirSync('path/to');

    expect(files.length).toBe(EXPECTED_NUMBER_OF_FILES);
  });

  it('should check if a file exists', () => {
    const PATH_TO_CHECK = 'path/to/file1.txt';

    fs.writeFileSync(PATH_TO_CHECK, 'test');

    const fileExists = fs.existsSync(PATH_TO_CHECK);

    expect(fileExists).toBe(true);
  });

  it('should read a file', () => {
    const PATH_TO_CHECK = 'path/to/file1.txt';
    const CONTENT_TO_CHECK = 'read_file_test';

    fs.writeFileSync(PATH_TO_CHECK, CONTENT_TO_CHECK);

    const fileContent = fs.readFileSync(PATH_TO_CHECK);

    expect(fileContent).toBe(CONTENT_TO_CHECK);
  });

  it('should rename a file', () => {
    fs.writeFileSync('path/to/file.txt', 'test');

    fs.renameSync('path/to/file.txt', 'path/to/renamed_file.txt');

    const fileExists = fs.existsSync('path/to/renamed_file.txt');

    expect(fileExists).toBe(true);
  });
});
