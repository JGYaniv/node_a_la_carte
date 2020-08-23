import React from 'react'

const SearchBar = ({ query, setQuery, getDetails }) => {

    return (
        <form onSubmit={e => {e.preventDefault();getDetails(query)}}>
            <input 
                type="text" 
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for a node module..."
                className="searchBar"
            ></input>
        </form>
    )

}

export default SearchBar