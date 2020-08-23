import React from 'react'

import Header from './header'
import SearchBar from './search-bar'
import SearchResults from './search-results'

const Search = ({ query, setQuery, results, updateResults, getDetails }) => (
    <div id="search">
        <Header></Header>
        <SearchBar {...{ query, setQuery, getDetails }}/>

        {
            query && 
            <SearchResults {...{ results, updateResults, getDetails }}/>
        }
    </div>
)

export default Search