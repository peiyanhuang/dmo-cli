#!/usr/bin/env node
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');

const inquirer = require('./lib/inquirer');
const download = require('./lib/download');
const render = require('./lib/render');

console.log(
  chalk.yellow(
    figlet.textSync('Ginit', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  const credentials = await inquirer.askPackageMessage();
  console.log(credentials);

  // 临时目录
  const destination = path.resolve(__dirname, './tel');
  download(destination, () => {
    console.log('render template');
    const spinner = ora('waiting...');
    // 动态渲染模板
    render(credentials, destination).then(val => {
      spinner.stop();

      const startCmd = 'npm start'
      console.log(
        chalk.white('please run'),
        chalk.bgBlue(`cd ${projectName} && npm i && ${startCmd}`),
        chalk.white('to start it'));
    }).catch(e => {
      spinner.stop();
    });
  });
}

run();
