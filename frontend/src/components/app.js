import React, { useState, useEffect } from 'react'

import Search from './search/search'
import Details from './details/details'
import Modal from './ui/modal'
import { searchModules, getModule } from '../utils/api-utils'

const App = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [details, setDetails] = useState({})
    const [errors, setErrors] = useState({})
    const [timer, setTimer] = useState(null)

    const [modal, setModal] = useState("")
    const loading = modal === "loading"

    const startLoad = () => {
        setModal("loading")
        setTimer(setTimeout(() => {
            setErrors({timeout: true})
        }, 15000))
    }

    const endLoad = () => {
        setModal("")
        clearTimeout(timer)
        setErrors({})
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
    useEffect(endLoad, [details])

    const searchProps = { results, query, setQuery, getDetails, loading }
    const modalProps = { modal, errors, getDetails }
    const detailProps = { details, loading }

    return(
        <>
            <Modal {...modalProps}/>
            <Search {...searchProps}/>
            {details["versions"] && <Details {...detailProps} />} 
        </>
    )
}

export default App;