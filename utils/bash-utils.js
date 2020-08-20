const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs')
const path = require('path')

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

async function minifyModule(name, version) {
    let { stdout, stderr } = await exec(`
        rm -rf temp/store;
        mkdir -p temp;
        cd temp;
        mkdir -p store;
        cd store;
        printf '${newPackageJson}' > package.json;
        npm install ${name}@${version};
        mkdir -p src;
        printf "const Test = require('${name}');" > src/index.js
        webpack src/index.js -o dist/main.js
        gzip -c dist/main.js > dist/main.js.gz
    `);
}

async function getSizes(moduleName, version){
    await minifyModule(moduleName, version).catch(e=>console.log(e))
    const miniStats = fs.statSync('./temp/store/dist/main.js')
    const gzipStats = fs.statSync('./temp/store/dist/main.js.gz')

    return {
        version,
        mini: miniStats.size,
        gzip: gzipStats.size
    }
}

module.exports = { getSizes }
