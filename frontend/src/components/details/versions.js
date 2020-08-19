import React from 'react'

const Versions = ({versions}) => (
    <ul>
        {versions.map(
            version => <li key={version.num}>
                <p>{version.num}</p>
                <p>{version.mini}</p>
                <p>{version.gzip}</p>
            </li>
        )}
    </ul>
)

export default Versions