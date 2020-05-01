const fs = require('fs');
const path = require('path');
const readline = require('readline');

const fileName = path.join(_dirname, 'xxx');

const readStream = fs.createReadStream(fileName);
const rl = readline.createInterface({
    input: readStream
});

let chromeNum = 0;
let sum = 0;
rl.on('line', (lineData) => {
    if (!lineData) {
        return;
    }
    sum ++;
    // do something
});
rl.on('close', () => {
    // do
});