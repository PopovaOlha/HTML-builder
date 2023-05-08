const path = require('path');
const fs = require('fs');
const secretFolder = path.join(__dirname, 'secret-folder');
console.log(secretFolder);

fs.readdir(secretFolder, { encoding: 'utf-8', withFileTypes: true }, (err, files) => {
    if (err) {
        return err;
    }
    console.log(files);
})