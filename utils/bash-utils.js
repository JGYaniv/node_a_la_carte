const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs')

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
        printf '${newPackageJson}' > package.json;
        npm install ${name};
        printf "const Test = require('${name}');" > src/index.js
        webpack
        gzip -c dist/main.js > dist/main.js.gz
    `);

    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
}

async function getSizes(moduleName){
    await minifyModule(moduleName)
    const miniStats = fs.statSync('../temp/store/dist/main.js')
    const gzipStats = fs.statSync('../temp/store/dist/main.js.gz')
    console.log(miniStats.size, gzipStats.size)
    return {
        mini: miniStats.size,
        gzip: gzipStats.size
    }
}

module.export = getSizes
