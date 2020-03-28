const fs = require('fs')
const {promisify} = require('util')
const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const path = require('path')
const logUtil = require('./logutil')
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

async function get(key) {
  console.log(RC)
  const exist = await exists(RC)
  let opts
  if(exist) {
    opts = await readFile(RC, 'utf-8')
    opts = decode(opts)
    return opts[key]
  }
  return ''
}
async function set(key,val) {
  console.log(RC)
  const exist = await exists(RC)
  let opts
  if(exist) {
    opts = await readFile(RC, 'utf-8')
    opts = decode(opts)
    opts[key] = val
    await writeFile(RC, encode(opts), 'utf-8')
    logUtil.success(`set ${key}= ${val} success!!!!`);
  }
  return ''
}

async function remove(key) {
  const exist = await exists(RC)
  let opts
  if(exist) {
    opts = await readFile(RC, 'utf-8')
    opts = decode(opts)
    delete opts[key]
    await writeFile(RC, encode(opts), 'utf-8')
    logUtil.success(`remove ${key} success!!!!`);
  }
}
module.exports = {
  getAll,
  get,
  set,
  remove
}