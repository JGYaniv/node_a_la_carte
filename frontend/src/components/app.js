import React, { useState, useEffect } from 'react'

import Search from './search/search'
import Details from './details/details'

import { queryModules, queryModuleDetails } from '../utils/api-utils'

const App = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [details, setDetails] = useState({})
    
    const updateResults = () => {
        if (!query) return
        queryModules(query)
            .then(res => setResults(res.data))
    }

    const getDetails = () => {
        queryModuleDetails(query)
            .then(res => setDetails(res.data))
    }
    
    useEffect(updateResults, [query])

    const searchProps = { results, query, setQuery, getDetails }

    return(
        <div>
            {/* <Header/> */}
            <Search {...searchProps}/>
            { details["versions"] && <Details details={details}/>} 
        </div>
    )
}

export default App;