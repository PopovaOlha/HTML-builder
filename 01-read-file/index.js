const path = require('path');
const fs = require('fs');
const {stdout} =require('process');
const filesName = path.resolve(__dirname, 'text.txt');
const readText = fs.createReadStream(filesName, {encoding: 'utf-8'});
let textData = '';

readText.on('data',(m) => textData += m);
readText.on('end', () => stdout.write(textData));
readText.on('error', (err) => stdout.write(err.message));