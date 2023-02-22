const express = require('express')
const mongoose = require('mongoose')
const port = 3000
const dbUrl = 'mongodb://127.0.0.1:27017/live-fit'

const app = express()

mongoose.connect(dbUrl, {
    useNewUrlParser: true
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})