import React from 'react'

const SearchBar = ({ query, setQuery, getDetails }) => {

    return (
        <form onSubmit={e => {e.preventDefault();getDetails()}}>
            <h1>Searchme</h1>
            <input type="text" onChange={e => setQuery(e.target.value)}></input>
            <input type="submit" value="SEARCH"></input>
        </form>
    )

}

export default SearchBar