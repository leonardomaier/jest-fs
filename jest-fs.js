const path = require('path');

const fs = jest.createMockFromModule('fs');

let filesystem = Object.create({});

const ls = (file) => {
  const dir = path.dirname(file);

  const files = filesystem[dir];

  return files;
};

fs.restore = () => {
  filesystem = Object.create({});
};

fs.writeFileSync = (file, content) => {
  const dir = path.dirname(file);

  if (!filesystem[dir]) {
    filesystem[dir] = [];
  }

  filesystem[dir].push({
    name: path.basename(file),
    content,
  });
};

fs.readdirSync = (dir) => filesystem[dir] || [];

fs.readFileSync = (file) => {
  const files = ls(file);

  const filename = path.basename(file);

  const foundFile = files.find((currentFile) => currentFile.name === filename);

  return foundFile.content;
};

fs.existsSync = (file) => {
  const files = ls(file);

  const filename = path.basename(file);

  if (!files) {
    return false;
  }

  return !!files.find((currentFile) => currentFile.name === filename);
};

fs.renameSync = (oldFile, newFile) => {
  const files = ls(oldFile);

  const oldFilename = path.basename(oldFile);

  const newFilename = path.basename(newFile);

  const fileIndex = files.findIndex((currentFile) => currentFile.name === oldFilename);

  files[fileIndex].name = newFilename;
};

fs.mkdirSync = (pathDir) => {
  if (!filesystem[pathDir]) {
    filesystem[pathDir] = [];
  }
};

module.exports = fs;
