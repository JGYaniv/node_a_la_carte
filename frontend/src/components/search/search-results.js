import React from 'react'

const SearchResults = ({ results, getDetails }) => {

    if (!results) return <ul></ul>

    const resultList = results.map((result, idx) => <li key={idx}>{result}</li>)

    return (
        <ul>
            {resultList}
        </ul>
    )
}

export default SearchResults