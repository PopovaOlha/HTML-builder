const path = require('path');
const fs = require('fs');

const assetsPath = path(__dirname, 'assets');
const stylesPath = path(__dirname, 'styles');
const htmlPath = path(__dirname, 'template.html');
const projectDist = path(__dirname, 'project-dist');

const projectAssets = path(projectDist, 'assets');
const projectHtml = path(projectDist, 'index.html');
const projectCss = path(projectDist, 'style.css');
