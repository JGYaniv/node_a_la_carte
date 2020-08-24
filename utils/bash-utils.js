const util = require('util');
const exec = util.promisify(require('child_process').exec);

function randStr(){
    //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function install(name, version) {
    let { stdout, stderr } = await exec(`
        ${process.env && (process.env.NODE_ENV === "production") ? 'cd' : 'cd .'}
        rm -rf temp/store
        mkdir -p temp/store
        mkdir temp/store/src
        cd temp/store
        npm init -y
        npm install ${name}@${version} --save
        echo "const Test = require('${name}'); Object.entries(Test);" > src/index.js
    `)

    console.log(stdout)
    console.log(stderr)
}

async function gzip(input, output) {
    let { stdout, stderr } = await exec(`
        gzip -c ${input} > ${output}
    `)

    console.log(stdout)
    console.log(stderr)
}

async function gzipTar(input, output) {
    let { stdout, stderr } = await exec(`
        tar -czvf ${input} ${output}
    `)

    console.log(stdout)
    console.log(stderr)
}

async function webpack(entry, output){
    let { stdout, stderr } = await exec(`
        webpack --mode="production"
    `)

    console.log(stdout)
    console.log(stderr)
}

module.exports = { install, gzip, webpack, gzipTar }
