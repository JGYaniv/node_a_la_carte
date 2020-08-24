const { npmsSearch, npmRegSearch, takeFive } = require('../utils/api-utils')
const { getSizes } = require('../utils/module-utils')
const { Version } = require('../models/versions')
const { Module } = require('../models/modules')
 
const show = async (req, res) => {
    // get module details and associated version details
    // TODO: remove awaits and run API calls asynchronously
    const result = await npmRegSearch(req.params.name)
    const versions = await Version.get(req.params.name)
    let moduleRecord = await Module.get(req.params.name)

    // if module is not yet in db, then create
    if (!moduleRecord) {
        await create({name: req.params.name})
        moduleRecord = await Module.get(req.params.name)
    }

    // compare versions in db to latest versions in npm registry
    const versionNums = versions.map(version => version.num)
    const versionsNotIncluded = result.versions.filter(version => !versionNums.includes(version))

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
    const selectedVersions = result.versions.map( version => allVersions.find(versionObj => versionObj.num === version  ))

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