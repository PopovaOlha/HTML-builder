const path = require('path');
const fs = require('fs');

const pathOfBundle = path.join(__dirname, 'project-dist');
const pathOfStyle = path.join(__dirname, 'styles');
const bundle = path.join(pathOfBundle, 'bundle.css');
console.log(bundle);

const readStyle = function(dir) {
    fs.readdir(dir, { encoding: 'utf-8', withFileTypes: true }, (err, files) => {
        if (err) {
            return err;
        }
        files.map(file => {
            if (path.extname(file.name) === '.css') {
                if (!file.isDirectory()) {
                    let p = path.join(dir, file.name);
                    readStyle(p);
                }
            }
        })
    })

}
