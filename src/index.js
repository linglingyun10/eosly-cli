// const { program } = require('commander')
// const { VERSION } = require('./utils/constant')

// function apply(action, ...args) {
//   console.log(action, args)
//   require(`./cmd/${action}`)(...args)
// }
// let actionMap = {
//   init: {
//       description: 'generate a new project from a template',
//       alias: 'i',
//       usages: [
//           'eos init templateName projectName'
//       ]
//   }
// }
const { program } = require('commander')
// const { VERSION } = require('./utils/constant')
program.version('1.0.0')
program
        .command('init')
        .description('生成一个项目')
        .alias('i')
        .action(() => {
          require(`./cmd/init`)('vue-cli3.x-template#master', 'test1')
        })
program.parse(process.argv)
if(!program.args.length) {
  program.help()
}

// console.log(program.command)
// Object.keys(actionMap).forEach(action => {
//   apply(action, 'vue-template', 'test');
// })
// // console.log(actionMap)
// console.log('====canshu===', ...process.argv.slice(3))
// Object.keys(actionMap).forEach(function (action) {
//   program.command(action)
//   .description(actionMap[action].description)
//   .alias(actionMap[action].alias) //别名
//   .action(function() {
//       switch (action) {
//           case 'config': 
//               //配置
//               apply(action, 'vue-template', 'test');
//               break;
//           case 'init':
//               apply(action, 'vue-template', 'test');
//               break;
//           default:
//               break;
//       }
//   });
// });

// function help() {
//   console.log('\r\nUsage:');
//   Object.keys(actionMap).forEach((action) => {
//       actionMap[action].usages.forEach(usage => {
//           console.log('  - ' + usage);
//       });
//   });
//   console.log('\r');
// }


// program.usage('<command> [options]');
// program.on('-h', help);
// program.on('--help', help);
// program.version(VERSION, '-V --version').parse(process.argv);

// // eos 不带参数时
// if (!process.argv.slice(2).length) {
//   program.outputHelp(make_green);
// }

// function make_green(txt) {
//   return chalk.green(txt); 
// }