import React from 'react'

const SearchResults = ({ results, getDetails }) => {

    if (!results) return <ul></ul>

    const clickHandler = e => {
        getDetails(e.currentTarget.innerText)
    }

    const resultList = results.map(
        (result, idx) => <li key={idx} onClick={clickHandler}>{result}</li>
    )

    return (
        <ul className="searchResults">
            {resultList}
        </ul>
    )
}

export default SearchResults