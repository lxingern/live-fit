const express = require('express')
const mongoose = require('mongoose')
const port = 3000
const dbUrl = 'mongodb://127.0.0.1:27017/live-fit'

const { Activity, getTodaysDate } = require('./models/Activity')

const app = express()

mongoose.connect(dbUrl, {
    useNewUrlParser: true
})

app.get('/', async (req, res) => {
    const todaysDate = getTodaysDate()
    const todaysData = await Activity.findOne({ date: todaysDate })
    res.status(200).send(todaysData.data)
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
