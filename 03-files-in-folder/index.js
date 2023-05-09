const path = require('path');
const fs = require('fs');
const secretFolder = path.join(__dirname, 'secret-folder');
console.log(secretFolder);

fs.readdir(secretFolder, { encoding: 'utf-8', withFileTypes: true }, (err, files) => {
    if (err) {
        return err;
    }

    files.map(file => {
        if (!file.isDirectory()) {
            let fileExt = path.extname(file.name);
            let nameOfFile = path.basename(file.name, fileExt);

            fs.stat(path.join(secretFolder, file.name), (err, response) => {
                if (err) {
                    return err;
                }
                console.log(`${nameOfFile} - ${fileExt.replace('.', '')} - ${response.size / 1024}kb`);
           });
        }
    })
})