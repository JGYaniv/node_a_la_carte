import React from 'react'

const SearchResults = ({ results, getDetails }) => {

    if (!results) return <ul></ul>

    const clickHandler = e => {
        console.log(e.target.innerText)
        getDetails(e.target.innerText)
    }

    const resultList = results.map(
        (result, idx) => <li key={idx} onClick={clickHandler}>{result}</li>
    )

    return (
        <ul>
            {resultList}
        </ul>
    )
}

export default SearchResults