const fs = require('fs');
const path = require('path');

const config = require('config');

const sep = path.sep;

class FileService {
  createDir(file) {
    const filePath = config.get('filePath') + sep + file.user + sep + file.path;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: 'File was created' });
        } else {
          return reject({ message: 'File already exist' });
        }
      } catch (e) {
        return reject({ message: 'File error' });
      }
    });
  }

  deleteFile(file) {
    const path = this.getPath(file);
    if (file.type === 'dir') {
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }

  getPath(file) {
    return config.get('filePath') + sep + file.user + sep + file.path;
  }
}

module.exports = new FileService();
