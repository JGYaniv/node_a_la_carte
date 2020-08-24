const { npmsSearch, npmRegSearch, takeFive } = require('../utils/api-utils')
const { getSizes } = require('../utils/module-utils')
const { Version } = require('../models/versions')
 
const show = async (req, res) => {
    // show module details and associated version details
    const result = await npmRegSearch(req.params.name)

    // figure out which versions we want (four most recent then last version from previous build)
    const fiveVersions = takeFive(result.versions)

    // compare versions in db to latest versions in npm registry
    const versions = await Version.get(req.params.name)
    const versionNums = versions.map(version => version.num)
    const versionsNotIncluded = fiveVersions.filter(version => !versionNums.includes(version))

    // if latest version is NOT in the db, then find which versions are missing and size em up
    newVersions = await Promise.all(versionsNotIncluded.map(
            async versionNum => {
                const sizes = await getSizes(result.name, versionNum)
                return { num: versionNum, ...sizes }
            }
        ))
    
    const allVersions = [...newVersions, ...versions]
    const selectedVersions = fiveVersions.map( version => allVersions.find(versionObj => versionObj.num === version  ))

    res.json({
        name: result.name,
        description: result.description,
        lastUpdated: result.lastUpdated,
        versions: selectedVersions
    })
}

const index = async (req, res) => {
    // returns all results that match the query string, using the npms directory API
    const result = await npmsSearch(req.query.q)
    res.json(result)
}

// const create = ({ name, details, sourceUpdated }) => {

// }


// const modulesDb = require('../db/modules')


module.exports = {show, index }