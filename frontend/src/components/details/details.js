import React from 'react'

import Versions from './versions'
import BarChart from './bar-chart'

const Details = ({details}) => (
    <section id="details">
        <h1>{details.title}</h1>
        <Versions versions={details.versions}></Versions>
        <BarChart versions={details.versions}></BarChart>
    </section>
)

export default Details