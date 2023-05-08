const path = require('path');
const fs = require('fs');

const pathOfBundle = path.join(__dirname, 'project-dist');
const pathOfStyle = path.join(__dirname, 'styles');
const bundle = path.join(pathOfBundle, 'bundle.css');
console.log(bundle);
