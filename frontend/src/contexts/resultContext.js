import React from 'react'

import sampleResponse from './sample-response.json'

export const ResultContext = React.createContext({
    title: "",
    current_version: "",
    versions: []
})

export const resultSample = {
    ...sampleResponse.selected_module,
    versions: sampleResponse.versions
}