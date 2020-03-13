const path = require('path')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const rm = require('rimraf').sync
const chalk = require('chalk')

/**
 * 动态生成模板
 * @param {object} metadata 元数据
 * @param {string} source 模板目录地址
 */
module.exports = function (metadata = {}, source) {
  if (!source) {
    return Promise.reject(new Error(`无效的source：${source}`))
  }
  const destination = path.resolve(process.cwd(), metadata.projectName)

  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata(metadata) // metadata 为用户输入的内容
      .clean(false)
      .source(source) // 模板文件 path
      .destination(destination) // 最终编译好的文件存放位置
      .use((files, metalsmith, done) => {
        Object.keys(files).forEach(fileName => { // 遍历替换模板
          if (!fileName.startsWith('static')) { // 判断是否为资源文件，资源文件不用替换
            const fileContentsString = files[fileName].contents.toString() // Handlebar compile 前需要转换为字符串
            files[fileName].contents = Buffer.from(Handlebars.compile(fileContentsString)(metalsmith.metadata()))
          }
        })
        done()
      }).build(err => { // build
        rm(source) // 删除下载下来的模板文件
        if (err) {
          console.log(chalk.red(`Metalsmith build error: ${err}`))
          return reject(err)
        } else {
          return resolve()
        }
      })
  })
}
