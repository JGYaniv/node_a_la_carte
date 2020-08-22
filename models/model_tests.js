const { Module } = require('./modules')
const { Version } = require('./versions')


Module.search('re').then(res => console.log(res)).catch(e => console.log(e))
Module.get('react').then(res => console.log(res)).catch(e => console.log(e))
Version.get('react').then(res => console.log(res)).catch(e => console.log(e))