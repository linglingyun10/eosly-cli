const {get, set, remove} = require('../utils/common')
const logUtil = require('../utils/logutil')
async function config(action, key, val) {
  switch (action) {
    case 'set':
      set(key, val)
      break;
    case 'get':
      let result = await get(key)
      logUtil.success(result)
      break;
    case 'remove':
      remove(key)
      break;
  
    default:
      break;
  }
}

module.exports = config