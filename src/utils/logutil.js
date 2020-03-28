const chalk = require('chalk')

function success(msg) {
  console.log(chalk.green.bold(`\n ${msg} \n`))
}
function warn(msg) {
  console.log(chalk.red.bold(`\n ${msg}) \n`))
}

function info(msg) {
  console.log(chalk.blue.bold(`\n ${msg}) \n`))
}
module.exports = {
  success,
  warn,
  info
}