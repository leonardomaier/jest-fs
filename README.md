# jest-fs

Node.js fs module mock for Jest unit testing.

## Requirements

- Node.js > 12
- Jest

## Usage

First we need to create a <code>\_\_mocks\_\_</code> folder and inside of the folder we must create a <code>fs.js</code> file with the content:

```js
const fs = require('jest-fs');
module.exports = fs;
```

After that, when creating a unit test we need to add these lines in the top:

```js
const fs = require('fs');

// Add this
jest.mock('fs');

describe('testing jest-fs', () => {

  it('should create a file', () => {
    fs.writeFileSync('path/to/file.txt', 'content');

    const files = fs.readdirSync('path/to');

    expect(files.length).toBe(1);
  });
});
```
