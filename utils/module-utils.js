const { install, gzip, gzipTar, webpack} = require('./bash-utils.js')
const { minifyRf } = require('./minify-utils.js')
const fs = require('fs')

async function getSizes(moduleName, version) {
    await install(moduleName, version).catch(e => console.log(e))

    let miniPath = 'temp/store/src/index.min.js'
    let gzipPath = miniPath + '.gz'

    await webpack('temp/store/src/index.js', miniPath).catch(e => console.log)
    await gzip(miniPath, gzipPath).catch(e => console.log(e))

    // if (!exitCode) {

    // }

    let miniStats, gzipStats

    try { miniStats = fs.statSync(miniPath) } 
    catch { miniStats = { size: 0 } }  
    // some modules are not webpacking correctly, setting to 0 as a fallback

    try { gzipStats = fs.statSync(gzipPath) } 
    catch { gzipStats = {size: 0} }

    let sizes = {
        version,
        mini: miniStats.size,
        gzip: gzipStats.size
    }

    return sizes
}

module.exports = { getSizes }