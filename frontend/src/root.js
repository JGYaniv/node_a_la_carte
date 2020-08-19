import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'

const Root = () => (
    <App/>
)

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Root />, document.getElementById('root'))
})