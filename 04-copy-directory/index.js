const path = require('path');
const fs = require('fs');

const filesFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

console.log(fs);

function deleteDirFiles(dir) {
    fs.readdir(dir, { encoding: 'utf8', withFileTypes: true }, (err, files) => {
        if (err) throw err;

        files.map(file => { 
            if (file.isDirectory()) {
            let newDir = path.join(dir, file.name);
            delFilesInDir(newDir);
        }
        else {
            fs.unlink(path.join(dir, file.name), () => { });
        }
    } 
});
};

function copyDir(dir, newDir) {
    fs.stat(newDir, (e) => {
        if (!e) {
            deleteDirFiles(newDir);
        }
       });