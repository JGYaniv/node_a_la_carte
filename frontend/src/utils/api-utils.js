import axios from 'axios' 

const urlHelper = () => (
    process.env && (process.env.NODE_ENV === 'production') ? 
        "https://node-a-la-carte.herokuapp.com/api" :
        "http://localhost:3000/api"
)

export const queryModules = query => {
    const url = `${urlHelper()}/find?q=${query.split(" ").join("+")}`;
    return axios.get(url)
        .catch(e => console.log(e))
}

export const queryModuleDetails = moduleName => {
    const url = `${urlHelper()}/details?q=${moduleName}`
    return axios.get(url)
        .catch(e => console.log(e))
}