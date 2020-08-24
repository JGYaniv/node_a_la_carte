import React from 'react'

const Suggest = ({getDetails}) => {

    const clickHandle = e => {
        e.preventDefault()
        getDetails(e.target.innerText)
    }

    return(
        <div className="greatSuggestion">
            <h3 className="errors">This module might take awhile to load...</h3>
            <p>while we figure it out please take a look at one of our more popular modules linked below!</p>
            <ul className="buttonGrid">
                <button onClick={clickHandle}>react</button>
                <button onClick={clickHandle}>redux</button>
                <button onClick={clickHandle}>lodash</button>
                <button onClick={clickHandle}>dotenv</button>
            </ul>
        </div>
    )
}

export default Suggest