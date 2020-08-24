const fs = require('fs')
const path = require('path')
const UglifyJS = require('uglify-js');

function randStr() {
    //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function minifyRf(dirPath, output) {
    fs.readdir(dirPath, function (err, files) {
        if (err) console.log(err)
        if (!files) return

        files.forEach(file => {
            let filePath = path.join(dirPath, file)

            // can we exclude files with .development.js or .min.js as a suffix?
            if (path.extname(filePath) == '.js') {
                minifyStep(filePath, output)
            } else if (fs.lstatSync(filePath).isDirectory()) {
                minifyRf(filePath, output)
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
        let savePath = path.join(output, path.basename(input) + randStr())
        fs.writeFileSync(savePath, mini.code)
    }
}


module.exports = { minifyRf, minifyStep, randStr }
