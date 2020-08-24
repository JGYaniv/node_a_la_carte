import React, { useState, useEffect } from 'react'

import Search from './search/search'
import Details from './details/details'
import Loader from './ui/loader'
import { searchModules, getModule } from '../utils/api-utils'

const App = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [stallTimer, setStallTimer] = useState(null)
    
    const startLoad = () => {
        setLoading(true)
        setStallTimer(setTimeout(() => {
            setErrors(["Looks like we're stuck... why don't you reload and check out another module?"])
        }, 15000))
    }

    const endLoad = () => {
        setLoading(false)
        clearTimeout(stallTimer)
        setErrors([])
    }

    const updateResults = () => {
        if (!query) return
        searchModules(query)
            .then(res => setResults(res.data))
    }

    const getDetails = name => {
        startLoad()
        getModule(name)
            .then(res => {
                if (!!res) setDetails(res.data)
                endLoad()
            })
    }
    
    useEffect(updateResults, [query])

    const searchProps = { results, query, setQuery, getDetails, loading }

    return(
        <>
            <Loader loading={loading} errors={errors}/>
            <Search {...searchProps}/>
            {details["versions"] && <Details details={details} loading={loading}/>} 
        </>
    )
}

export default App;