import React from 'react'

const Bar = ({version, scale}) => {
    const {mini, gzip} = version;
    return (
        <svg className="bar">
            <g>
                <rect 
                    className="mini"
                    height={`${mini / scale * 100}%`} 
                />
                <rect 
                    className="gzip"
                    height={`${gzip / scale * 100}%`}
                />
            </g>
        </svg>
    )
}

export default Bar