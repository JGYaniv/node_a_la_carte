import React from 'react'

const Loader = ({loading, errors}) => (
    <div id="loadModal" class={loading ? "" : "hidden"}>
        <h2 class={errors.length ? "errors" : "hidden"}>{errors.join(" ")}</h2>
        <div></div>
    </div>
)

export default Loader