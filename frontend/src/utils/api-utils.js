import sampleResponse from './sample-response.json'

export const queryModules = query => (
    sampleResponse.modules.filter(
        el => el.includes(query)
    )
)

export const queryModuleDetails = moduleName => sampleResponse.module