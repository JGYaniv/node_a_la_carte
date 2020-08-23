import React, { useState, useEffect } from 'react'

import Search from './search/search'
import Details from './details/details'

import { searchModules, getModule } from '../utils/api-utils'

const App = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [details, setDetails] = useState({})
    
    const updateResults = () => {
        if (!query) return
        searchModules(query)
            .then(res => setResults(res.data))
    }

    const getDetails = name => {
        getModule(name)
            .then(res => {console.log(res.data);setDetails(res.data)})
    }
    
    useEffect(updateResults, [query])

    const searchProps = { results, query, setQuery, getDetails }

    return(
        <>
            {/* <Header/> */}
            <Search {...searchProps}/>
            { details["versions"] && <Details details={details}/>} 
        </>
    )
}

export default App;