const { npmsSearch, npmRegSearch, takeFive } = require('../utils/api-utils')
const { getSizes } = require('../utils/module-utils')
const { Version } = require('../models/versions')
const { Module } = require('../models/modules')
 
const show = async (req, res) => {
    // get module details and associated version details
    const result = await npmRegSearch(req.params.name)
    let moduleRecord = await Module.get(req.params.name)
    const versions = await Version.get(req.params.name)

    if (!moduleRecord) {
        await create({name: req.params.name})
        moduleRecord = await Module.get(req.params.name)
    }

    // figure out which versions we want (four most recent then last version from previous build)
    const fiveVersions = takeFive(result.versions)

    // compare versions in db to latest versions in npm registry
    const versionNums = versions.map(version => version.num)
    const versionsNotIncluded = fiveVersions.filter(version => !versionNums.includes(version))

    // if latest version is NOT in the db, then find which versions are missing and size em up
    newVersions = await Promise.all(versionsNotIncluded.map(
            async versionNum => {
                const sizes = await getSizes(result.name, versionNum)
                const newVersion = { num: versionNum, ...sizes, moduleId: moduleRecord.id }
                Version.create(newVersion)
                return newVersion
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

const create = async ({name}) => {
    const validModule = await npmRegSearch(name)

    if (!validModule.error) {
        Module.create({ 
            name, 
            description: validModule.description, 
            sourceUpdated: new Date()
        })
    }

    return validModule
}


module.exports = {show, index, create }