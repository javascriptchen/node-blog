/*
 * @Author: 陈晨 
 * @Date: 2019-03-31 13:14:55 
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-03-31 13:17:14
 */
const path = require('path')
const fs = require("fs")

// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

// 生成writeStream
function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, "../../logs/", fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream;
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')

function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}