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
            const versions = takeFive(Object.keys(time))
            return { name, description, versions, lastUpdated: time.modified }
        })
        .catch(e => console.log(e))
}

const takeFive = (versions) => {
    let validVersions = versions.filter(version => version.match(/^\d{1,3}.\d{1,3}.\d{1,3}$/))
    let sortedVersions = sortVersions(validVersions)
    let recentBuilds = sortedVersions.slice(0, 4)
    let oldestSelected = recentBuilds.find(build => build.match(/^\d{1,3}/))
    let previousBuildNum = parseInt(oldestSelected) - 1
    let previousBuild = validVersions.find(version => version.split(".")[0] === `${previousBuildNum}`)
    return [...recentBuilds, previousBuild]
}

const sortVersions = versions => {
    return versions.sort((version1, version2) => {
        let v1 = version1.split(".").map(num => parseInt(num))
        let v2 = version2.split(".").map(num => parseInt(num))
        if (v2[0] - v1[0]) return v2[0] - v1[0]
        if (v2[1] - v1[1]) return v2[1] - v1[1]
        return v2[2] - v1[2]
    })
}

module.exports = { npmsSearch, npmRegSearch, takeFive}