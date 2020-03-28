const fs = require('fs')
const {promisify} = require('util')
const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const path = require('path')
const {decode, encode} = require('ini')
const RC = path.resolve(__dirname, '../../','.eosrc')


async function getAll() {
  console.log(RC)
  const exist = await exists(RC)
  let opts
  if(exist) {
    opts = await readFile(RC, 'utf-8')
    opts = decode(opts)
    return opts
  }
  return {}
}
module.exports = {
  getAll
}