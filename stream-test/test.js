const path = require("path")
const fs = require("fs")

const fileName1 = path.resolve(__dirname,'data.txt')
const fileName2 = path.resolve(__dirname,'data-back.txt')

const readSteam = fs.createReadStream(fileName1)
const writeSteam = fs.createWriteStream(fileName2)

readSteam.pipe(writeSteam)
readSteam.on('data',chunk=>{
    console.log(chunk.toString());
})
readSteam.on('end',()=>{
    console.log("copy done");
})