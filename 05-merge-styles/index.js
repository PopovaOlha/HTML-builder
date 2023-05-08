const path = require('path');
const fs = require('fs');

const pathOfBundle = path.join(__dirname, 'project-dist');
const pathOfStyle = path.join(__dirname, 'styles');
const bundle = path.join(pathOfBundle, 'bundle.css');
console.log(bundle);

const addFile = function(file) {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            return err;
        }
        fs.appendFile(bundle, `\n/* add from ${path.basename(file)} */\n${data}\n`, (err) => {
            if (err) {
                return err;
            }
        })
    });
};

const readStyle = function(dir) {
    fs.readdir(dir, { encoding: 'utf-8', withFileTypes: true }, (err, files) => {
        if (err) {
            return err;
        }
        files.map(file => {
            if (path.extname(file.name) === '.css') {
                if (file.isDirectory()) {
                    let p = path.join(dir, file.name);
                    readStyle(p);
                } else {
                    addFile(path.join(dir, file.name));
                }
            }
        });
    });

};
const addBundle = function() {
    fs.unlink(bundle, () => {
        fs.rmdir(pathOfBundle, () => {
            fs.mkdir(pathOfBundle, () => {readStyle(pathOfStyle);})
        });
    });
};
addBundle();
