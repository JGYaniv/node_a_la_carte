const axios = require('axios')

const npmsUrl = query => `https://api.npms.io/v2/search?q=${query.split(" ").join("+")}+boost-exact:false`
const npmRegUrl = name => `https://registry.npmjs.org/${name}`

// returns list of node modules based on keywords & sorted by popularity
const npmsSearch = query => {
    const queryUrl = npmsUrl(query)
    return axios
        .get(queryUrl)
        .then(res => res.data.results.map(result => result.package.name))
        .catch(e => console.log(e))
}

// returns NPM registry details on a specific node module
const npmRegSearch = name => {
    const queryUrl = npmRegUrl(name)
    return axios
        .get(queryUrl)
        .then(res => {
            const { name, description, time } = res.data
            const versions = latestVersions(time)
            return { name, description, versions, lastUpdated: time.modified }
        })
        .catch(e => console.log(e))
}

// takes an object with keys of versions and values of dates created, returns an array of the three latest releases and then one major build before that
const latestVersions = times => {
    let versions = Object.keys(times)
    let validVersions = versions.filter(version => version.match(/^\d{1,3}.\d{1,3}.\d{1,3}$/)).reverse()
    let recentBuilds = validVersions.slice(0, 4)
    let oldestSelected = recentBuilds.find(build => build.match(/^\d{1,3}/))
    let previousBuildNum = parseInt(oldestSelected) - 1
    let previousBuild = validVersions.find(version => version.split(".")[0] === `${previousBuildNum}`)
    return [...recentBuilds, previousBuild]
}

module.exports = { npmsSearch, npmRegSearch}