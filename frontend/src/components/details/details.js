import React from 'react'

import Versions from './versions'

const Details = ({details, loading}) => {
    const scale = details.versions.reduce( (max, version) => {
        return max > version.mini ? max : version.mini
    }, 0)

    return (
        <div id="details" className={loading ? "hidden" : ""}>
            <div className="header">
                <h1>{details.name}</h1>
                <h3>{details.description}</h3>
            </div>
            <Versions versions={details.versions} scale={scale}></Versions>
            
        </div>
    )
}

export default Details