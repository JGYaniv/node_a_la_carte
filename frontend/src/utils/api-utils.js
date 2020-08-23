import axios from 'axios' 

const urlHelper = () => (
    window.location.href.includes("localhost") ? 
        "http://localhost:3000/api" :
        "https://node-a-la-carte.herokuapp.com/api"
)

export const searchModules = query => {
    const url = `${urlHelper()}/modules?q=${query.split(" ").join("+")}`;
    return axios.get(url)
        .catch(e => console.log(e))
}

export const getModule = name => {
    const url = `${urlHelper()}/modules/${name}`
    return axios.get(url)
        .catch(e => console.log(e))
}