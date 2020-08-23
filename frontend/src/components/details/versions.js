import React from 'react'

import Bar from './bar'

const Versions = ({versions, scale}) => {
    const toKb = bits => `${Math.round((bits / 1000).toFixed(2) * 100) / 100}kb`

    return(
        <ul>
            {versions.map(
                (version, idx) => <li key={idx * 10000}>
                    <div className="versionText">
                        <div className="version"><p>{`v${version.num}`}</p></div>
                        <div className="mini"><span>mini: </span><span>{toKb(version.mini)}</span></div>
                        <div className="gzip"><span>gzip: </span><span>{toKb(version.gzip)}</span></div>
                    </div>

                    <Bar className="versionBar" version={version} scale={scale}></Bar>
                </li>
            )}
        </ul>
    )
}

export default Versions