import React from 'react'

import SearchBar from './search-bar'
import SearchResults from './search-results'

const Search = ({ query, setQuery, results, updateResults, getDetails }) => (
    <section id="search">
        <SearchBar {...{ query, setQuery, getDetails }}/>

        {
            query && 
            <SearchResults {...{ results, updateResults, getDetails }}/>
        }
    </section>
)

export default Search