const fs = require('fs')
const logUtil = require('../utils/logutil')
const inquirer = require('inquirer')
const ora = require('ora')
const downloadGit  = require('download-git-repo')
const {getAll} = require('../utils/download')
const  cfgItems = [
  {
    name: 'author'
  }
]

async function downloadLocal(templateName, projectName) {
  let config = await getAll()
  console.log(config)
  let api =`${config.registry}/${templateName}`
  console.log(api)
  return new Promise((resolve, reject) => {
    downloadGit(api, projectName,{ clone: true }, (err) => {
      if(err) {
        reject(err)
      }
      resolve()
    })
  }) 
}
async function init(templateName, projectName) {
  console.log(templateName, projectName)
  if(!fs.existsSync(projectName)) {
    inquirer.prompt(cfgItems).then(async (answer) => {
      let spinner = ora("downloading template....")
      spinner.start()
      let result = await downloadLocal(templateName, projectName)
      if(result === undefined) {
        spinner.succeed()
        let fileName = `${projectName}/package.json`
        if(fs.existsSync(fileName)){
          const data = fs.readFileSync(fileName).toString();
          let json = JSON.parse(data);
          json.name = projectName;
          json.author = answer.author;
          //修改项目文件夹中 package.json 文件
          fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
          logUtil.success('init project success!!!!');
      }
      } else {
        logUtil.warn(result)
      }
    })
  } else {
    logUtil.warn('项目已经存在')
  }
}


module.exports = init