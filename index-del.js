#! /usr/bin/env node
const figlet = require('figlet');
const Printer = require('@darkobits/lolcatjs');
const package = require('../package.json');
const {Command} = require('commander');
const ora = require('ora');
const download = require('download-git-repo');
const shell = require('shelljs');
let json2ts = require('json2ts');

// const spinner = ora('Loading unicorns').start();

// setTimeout(() => {
//     spinner.color = 'yellow';
//     spinner.text = 'Loading rainbows';
//    spinner .succeed('😊😊')
//     // spinner.stop()
// }, 1000);
//
// https://github.com/xflihaibo/rollupcli.git
// https://github.com/xflihaibo/rollupcli.git

// const emojiRegex = require('emoji-regex/RGI_Emoji.js');
// const regex = emojiRegex();
// const rovel = require("rovel.js");
// console.log(rovel.text.green("Hello World"));
// download('direct:https://gitlab.com/flippidippi/download-git-repo-fixture.git', 'test/tmp', { clone: true }, function (err) {
// console.log(err ? 'Error' : 'Success')
// })

const chalk = require('chalk');
const program = new Command();
const input = figlet.textSync('TMS Cli', {
  horizontalLayout: 'full',
  verticalLayout: 'full',
  width: 500,
  whitespaceBreak: true
});
const transformed = Printer.default.fromString(`${input}\n  @from taimei technology   version ${package.version}`);

// console.log(process.argv);

// console.log(chalk.blue('Hello world!'));
// console.log(chalk.cyan('Hello world!'));
// console.log(chalk.magenta('Hello world!'));
// console.log(chalk.blue.bgRed.bold('Hello world!'))
// console.log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// program
//   .option('-v, --version', chalk.blue('version'))
//   .option('-h, --help', chalk.blue('help'))
//   .option('-i, -init',chalk.blue('init project'));

// program.version(transformed);

// program
//   .command('clone <source> [destination]')
//   .description('clone a repository into a newly created directory')
//   .action((source, destination) => {
//     console.log('🍎🍎',source,destination);
//   });

// // program

// program
//   .option( chalk.cyan('version'), chalk.cyan('output the version number'))
//   .option( chalk.cyan('help'), chalk.cyan('can I help you? '))
//   .option( chalk.cyan('init'), chalk.cyan('init project! '))
//     .usage("[cmd] <options>")
//   .arguments('<cmd> [env]')
//   .action((source, destination) => {
//     console.log('🍎🍎🍎🍎',source,destination);
//   }).parse();

program
  .option('-v, --version', chalk.cyan('output the version number'))
  .option('i, install', chalk.cyan('updata tms-cli'))
  .option('-i, --init', chalk.cyan('init project! '))
  .option('-t, --json2ts', chalk.cyan('typesscript to type! '))
  .option('-r, --rollup <filename> ', chalk.cyan('create rollup template! '))
  .helpOption('-h, --help', chalk.cyan('can I help you? '))
  .parse(process.argv);
const options = program.opts();

if (options.version) {
  console.log(transformed);
}

if (options.init) {
  console.log(`- init project`);
}
if (options.rollup) {
  console.log(`- rollup project`, options.rollup);
}

if (options.json2ts) {
  console.log('log', json2ts);
  let result = json2ts.convert(
    JSON.stringify({
      name: 'busili',
      age: 12,
      happy: ['music', 'eats']
    })
  );
  console.log(result);
}
