const path = require('path');
const fs = require('fs');
const nameOfFile = 'text.txt';
const readline = require('readline');

const filesI = fs.createWriteStream(path.join(__dirname, nameOfFile), 'utf-8');

const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Введите текст пожалуйста');
readLine.on('line', (value) => {
    if (value === 'exit') {
        onExitFile();
        return;
    }
    console.log('Введите текст пожалуйста ');
    filesI.write(`${value}\n`);
});

function onExitFile() {
    console.log('Всего наилучшего!');
    filesI.end('------------------------------');
    filesI.close();
    readLine.close();
}

readLine.on('SIGINT', () => {
    onExitFile();
});
