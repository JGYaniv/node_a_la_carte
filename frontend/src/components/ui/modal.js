import React from 'react'
import Suggest from './suggest'

const Modal = ({modal, errors, getDetails}) => (
    <>
        { errors.timeout && <Suggest getDetails={getDetails}/> }
        { modal === "loading" && <div className="loadingMan"></div> }
        
        <div className={modal ? "modal" : "hidden"}></div>
    </>
)

export default Modal