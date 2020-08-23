const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs')
const path = require('path')
const UglifyJS = require('uglify-js');

function randStr(){
    //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function installTemp(name, version) {
    let { stdout, stderr } = await exec(`
        ${process.env && (process.env.NODE_ENV === "production") ? 'cd' : 'cd .'}
        rm -rf temp/store
        mkdir -p temp/store
        mkdir temp/store/mini
        cd temp/store
        npm init -y
        npm install ${name}@${version} --save
    `)

    console.log(stdout)
    console.log(stderr)
}

async function minifyRf(dirPath, output){
    fs.readdir(dirPath, function (err, files) {
        if (err) console.log(err)
        if (!files) return
        
        files.forEach( file => {
            let filePath = path.join(dirPath, file)
            
            // can we exclude files with .development.js or .min.js as a suffix?

            if (path.extname(filePath) == '.js'){
                minifyStep(filePath, output)
            } else if (fs.lstatSync(filePath).isDirectory()){
                fs.mkdir(path.join(output, file + randStr()), function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("New directory successfully created.")
                    }
                })
                minifyRf(filePath, output)
            } else {
                try {
                    fs.copyFileSync(filePath, path.join(output, file + randStr()))
                } catch {
                    e => console.log(e)
                }
            }
        })
    })
}

function minifyStep(input, output) {
    var mini = UglifyJS.minify(input, {
        mangle: true,
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
        }
    })

    if (mini && mini.code) {
        let savePath = path.join(output, path.basename(input) + randStr() )
        fs.writeFileSync(savePath, mini.code)
    }
}

async function gzip(input, output) {
    let { stdout, stderr } = await exec(`
        tar -zcvf ${output} ${input}
    `)

    console.log(stdout)
    console.log(stderr)
}

async function getSizes(moduleName, version){
    await installTemp(moduleName, version).catch(e => console.log(e))
    await minifyRf('temp/store/node_modules', 'temp/store/mini').catch(e => console.log(e))
    await gzip('temp/store/mini', 'temp/store/gzip.tar.gz').catch(e => console.log(e))

    let miniStats
    let gzipStats

    try {
        miniStats = fs.statSync('temp/store/mini')
    } catch {
        miniStats = { size: 0 }
    }

    try {
        gzipStats = fs.statSync('temp/store/gzip.tar.gz')
    } catch {
        gzipStats = { size: 0 }
    }

    let sizes = {
        version,
        mini: miniStats.size,
        gzip: gzipStats.size
    }

    return sizes
}

module.exports = { getSizes, gzip, minifyRf }
