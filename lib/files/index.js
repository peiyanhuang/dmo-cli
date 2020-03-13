const fs = require('fs');
const path = require('path');

module.exports = {
  // 获取当前路径
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },
  // 判断文件或目录是否存在
  directoryExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  }
};
