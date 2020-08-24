import React from 'react'

const Modal = ({loading, errors}) => (
    <div id="loadModal" className={loading ? "" : "hidden"}>
        <h2 className={errors.length ? "errors" : "hidden"}>{errors.join(" ")}</h2>
        <div></div>
    </div>
)

export default Modal