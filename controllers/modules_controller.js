const { npmsSearch, npmRegSearch } = require('../utils/api-utils')
const { getSizes } = require('../utils/bash-utils')
const { Module } = require('../models/modules')
const { Version } = require('../models/versions')
const versions = require('../models/versions')
 
const show = async (req, res) => {
    // show module details and associated version details
    const result = await npmRegSearch(req.params.name)
    // check to see if the latest version is in the db

    // if latest version is NOT in the db, then find which versions are missing and size em up

    // maybe we should move this logic to the versions controller and only return a list of version nums or ids???
    // const versions = await Promise.all(result.versions.map(
    //     async version => {
    //         // ONLY GET SIZES if we don't already have the sizes for this version
    //         const sizes = await getSizes(result.name, version)
    //         return { version: version, ...sizes }
    //     }
    // ))

    let versions = await Version.get(req.params.name)
    res.json({
        name: result.name,
        description: result.description,
        lastUpdated: result.lastUpdated,
        versions
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