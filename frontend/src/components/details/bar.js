import React from 'react'

const Bar = ({version, idx}) => {
    const {num, mini, gzip} = version;

    return (
        <>
            <rect 
                x={idx * 30} 
                height={mini * .03} 
                width={20 - 2} 
                fill={"#000000"} 
            />
            <rect 
                x={idx * 30} 
                height={gzip * .03} 
                width={20 - 2} 
                fill={"#287000"} 
            />
        </>
    )
}

export default Bar