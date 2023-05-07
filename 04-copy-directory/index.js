const path = require('path');
const fs = require('fs');

const folderOfFiles = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');


const deleteDirFiles = function(dir) {
    fs.readdir(dir, { encoding: 'utf8', withFileTypes: true }, (err, files) => {
        if (err) throw err;

        files.map(file => { 
            if (file.isDirectory()) {
            let newDir = path.join(dir, file.name);
            deleteDirFiles(newDir);
        }
        else {
            fs.unlink(path.join(dir, file.name), () => { });
        }
    }); 
});
};

const copyDir = function(dir, newDir) {
    fs.stat(newDir, (e) => {
        if (!e) {
            deleteDirFiles(newDir);
        }
       });
       fs.mkdir(newDir, { recursive: true }, (err) => {
        if (err) throw err;

        fs.readdir(dir, { encoding: 'utf8', withFileTypes: true }, (err, files) => {
            if (err) throw err;

            files.map(file => {
                if (file.isDirectory()) {
                    fs.mkdir(path.join(dir, file.name), { recursive: true }, (error) => { if (error) throw error; });
                    copyDir(path.join(dir, file.name), path.join(newDir, file.name));
                }
                else {
                    fs.copyFile(path.join(dir, file.name), path.join(newDir, file.name), (errCopy) => {
                        if (errCopy) throw errCopy;
                    });
                }
            });
        });
        console.log('Копия готова!');
    });
}
copyDir(folderOfFiles, copyFolder);