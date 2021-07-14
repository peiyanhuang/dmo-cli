#!/usr/bin/env node
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const ora = require('ora');

const inquirer = require('./lib/inquirer');
const download = require('./lib/download');
const render = require('./lib/render');

console.log(
  chalk.yellow(
    figlet.textSync('Dinit', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  const credentials = await inquirer.askPackageMessage();
  console.log(credentials);

  // 临时目录
  const destination = path.resolve(__dirname, './tel');
  download(destination, () => {
    const spinner = ora('render template waiting...');
    // 动态渲染模板
    render(credentials, destination).then(val => {
      console.log(chalk.green('render success!'));
      spinner.stop();

      const startCmd = 'npm start'
      console.log(
        chalk.white('please run'),
        chalk.black(`cd ${credentials.projectName} && npm i && ${startCmd}`),
        chalk.white('to start it'));
    }).catch(e => {
      console.log(
        chalk.red('fail:'),
        chalk.red(e)
      );
      spinner.stop();
    });
  });
}

run();
