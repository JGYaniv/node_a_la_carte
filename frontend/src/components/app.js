import React, { useState, useEffect } from 'react'

import Search from './search/search'
import Details from './details/details'

import { queryModules, queryModuleDetails } from '../utils/api-utils'

const App = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [details, setDetails] = useState({})
    
    const updateResults = () => {
        const newResults = queryModules(query)
        setResults(newResults)
    }

    const getDetails = () => {
        const newDetails = queryModuleDetails(query)
        setDetails(newDetails)
    }
    
    useEffect(updateResults, [query])

    const searchProps = { results, query, setQuery, getDetails}

    return(
        <div>
            {/* <Header/> */}
            <Search {...searchProps}/>
            { details["versions"] && <Details details={details}/>} 
        </div>
    )
}

export default App;