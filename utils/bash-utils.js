const util = require('util');
const exec = util.promisify(require('child_process').exec);
const compressor = require('node-minify');
const fsp = fs.promisify

const newPackageJson = `
{
    "name": "temp",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "author": "",
    "license": "ISC",
    "dependencies": {}
}`

async function minifyModule(name) {
    let { stdout, stderr } = await exec(`
        rm -rf ../temp/store;
        cd ..; 
        cd temp;
        mkdir -p store;
        cd store;
        mkdir -p src;
        printf '${newPackageJson}' > src/package.json;
        npm install ${name};
        printf "const ${name} = require('${name}');" > index.js
        webpack
    `);

    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
}

async function getSizes(moduleName){
    await minifyModule(moduleName)
}

getSizes('react')

// async function cd(arg){
//     let { stdout, stderr } = await exec(`cd ${arg}`);

//     console.log('stdout:', stdout);
//     console.error('stderr:', stderr);
// }

// Promise.all([
//     ls(),
//     cd(".."),
//     ls()
// ])