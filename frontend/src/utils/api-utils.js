import sampleResponse from './sample-response.json'

export const queryModules = query => (
    fetch(`https://node-a-la-carte.herokuapp.com/api/find?q=${query.split(" ").join("+")}`)
        .then(res => res)
        .catch(e => console.log(e))
)

export const queryModuleDetails = moduleName => (
    fetch(`https://node-a-la-carte.herokuapp.com/api/request?q=${moduleName}`)
        .then(res => res)
        .catch(e => console.log(e))
)