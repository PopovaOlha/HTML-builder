const path = require('path');
const fs = require('fs');

const assetsPath = path(__dirname, 'assets');
const stylesPath = path(__dirname, 'styles');
const htmlPath = path(__dirname, 'template.html');
const projectDist = path(__dirname, 'project-dist');

const projectAssets = path(projectDist, 'assets');
const projectHtml = path(projectDist, 'index.html');
const projectCss = path(projectDist, 'style.css');

const clearExistFolder = function(dir) {
    fs.readdir(dir, { encoding: 'utf-8', withFileTypes: true}, (err, files) => {
        if (err) {
            return err;
        }
        files.map(file => {
            if (file.isDirectory()) {
                let newDir = path.join(dir, file.name);
                clearExistFolder(newDir);
            } else {
                fs.unlink(path.join(dir, file.name), () => {});
            }
        });
    });
};
const createNewFolder = function(dir) {
    fs.stat(dir, (e) => {
        if (!e) {
            clearExistFolder(dir);
        }
    });
    fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
            return err;
        }
    })
}
const appendToFile = function(file) {
    fs.readFile(file, 'utf8', (err, data) => { 
        if (err) {
            return err;
        }
        fs.appendFile(projectCss, `\n/* add from ${path.basename(file)} */\n${data}\n`, (err) => {
            if (err) {
                return err;
            }
        });
    });
};
const readStyleFiles = function(dir) {
    fs.readdir(dir, { encoding: 'utf-8', withFileTypes: true}, (err, files) => {
        if (err) {
            return err;
        }
        files.map(file => {
            if (path.extname(file.name) === '.css') {
                if (file.isDirectory()) {
                    let path = path.join(dir, file.name);
                    readStyleFiles(path);
                } else {
                    appendToFile(path.join(dir, file.name));
                }
            }
        });
    });
};

