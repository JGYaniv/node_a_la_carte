import React from 'react'

import Bar from './bar'

const BarChart = ({ versions }) => {
    return (
        <svg width="800" height="300" >
            <g className="chart">
                {versions.map((version,idx) => <Bar version={version} idx={idx}></Bar>)}
            </g>
        </svg>
    )
}

export default BarChart