const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(data.toString());
// })

// 写入文件
// const content = "qwe\n"
// const opt = {
//     flag: 'a' // 追加写入，覆盖用w
// }
// fs.writeFile(fileName, content, opt, err => {
//     if (err) {
//         console.error(err)
//         return
//     }
// })

// 判断文件是否存在
fs.exists(fileName,exists=>{
    console.log('exists,',exists);
})