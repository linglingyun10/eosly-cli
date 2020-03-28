const { program } = require('commander')
const { VERSION } = require('./utils/constant')

function apply(action, ...args) {
  require(`./cmd/${action}`)(...args)
}
let actionMap = {
  init: {
      description: 'generate a new project from a template',
      alias: 'i',
      usages: [
          'eos init templateName projectName'
      ]
  },
  config: {
    alias: 'cfg',
    description: '',
    usages: [
      'eosly-cli config set <k> <v>',
      'eosly-cli config get <k>',
      'eosly-cli config remove <k>'
    ]
  }
}
Object.keys(actionMap).forEach(function (action) {
  program.command(action)
  .description(actionMap[action].description)
  .alias(actionMap[action].alias) //别名
  .action(function() {
    console.log('===process-arguments==', ...process.argv)
      switch (action) {
          case 'config': 
              //配置
              apply(action, ...process.argv.slice(3))
              break;
          case 'init':
              apply(action, ...process.argv.slice(2))
              break
          default:
              break
      }
  })
})

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach((action) => {
      actionMap[action].usages.forEach(usage => {
          console.log('  - ' + usage);
      });
  });
  console.log('\r');
}


program.usage('<command> [options]');
program.on('-h', help);
program.on('--help', help);
program.version(VERSION, '-V --version').parse(process.argv);

// eos 不带参数时
if (!process.argv.slice(2).length) {
  program.outputHelp(make_green);
}

function make_green(txt) {
  return chalk.green(txt); 
}