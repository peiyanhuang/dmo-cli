/*
 * 下载模板
 **/
const ora = require('ora');
const chalk = require('chalk');
const downloadGit = require('download-git-repo');

const url = 'github:peiyanhuang/vue-template';
const clone = false;

/**
 * 从github下载模板
 * @param {string} destination 临时目录地址,存放模板文件
 * @param {function} callback
 */
const download = (destination, callback) => {
  console.log('download the template');
  const spinner = ora('waiting...');
  spinner.start();
  // 下载模板
  downloadGit(url, destination, {
    clone
  }, err => {
    spinner.stop();
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log(chalk.green('download success!'));
      callback();
    }
  });
}

module.exports = download;
