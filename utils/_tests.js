const { takeFive } = require('./api-utils')
const { minifyRf } = require('./bash-utils')
const { getSizes } = require('./module-utils')

// const versions = ["1.1.2", "1.1.3", "1.1.4", "1.1.5", "1.1.6", "1.1.7", "1.1.8", "0.8.2"]
// console.log(takeFive(versions))

// console.log(getSizes("react", "16.13.1"))

// minifyRf("./temp/store/node_modules", "./temp/store/mini")

getSizes('pg','8.3.2').then(res => console.log(res))
// getSizes('d3-selection', '2.0.0').then(res => console.log(res))
// getSizes('react', '16.13.2').then(res => console.log(res))