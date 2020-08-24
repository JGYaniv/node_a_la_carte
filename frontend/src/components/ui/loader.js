import React from 'react'

const Loader = ({loading, errors}) => (
    <div id="loadModal" className={loading ? "" : "hidden"}>
        <h2 className={errors.length ? "errors" : "hidden"}>{errors.join(" ")}</h2>
        <div></div>
    </div>
)

export default Loader