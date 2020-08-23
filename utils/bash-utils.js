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
        echo CURRENT DIR: \`pwd\`
        ${process.env && (process.env.NODE_ENV === "production") ? 'cd' : 'cd .'}
        rm -rf temp/store
        mkdir -p temp/store
        cd temp/store
        printf '${newPackageJson}' > package.json
        npm install ${name}@${version}
        mkdir -p src
        printf "const Test = require('${name}')" > src/index.js
        cd ../..
        webpack
        gzip -c temp/store/dist/main.js > temp/store/dist/main.js.gz
    `)

    console.log(stdout)
    console.log(stderr)
}

async function getSizes(moduleName, version){
    await minifyModule(moduleName, version).catch(e=>console.log(e))
    let miniStats, gzipStats
    try {
        miniStats = fs.statSync('./temp/store/dist/main.js')
    } catch {
        miniStats = { size: 0 }
    }
    
    try {
        gzipStats = fs.statSync('./temp/store/dist/main.js.gz')
    } catch {
        gzipStats = { size: 0 }
    }

    return {
        version,
        mini: miniStats.size,
        gzip: gzipStats.size
    }
}

module.exports = { getSizes }
