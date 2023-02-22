const express = require('express')
const mongoose = require('mongoose')
const port = 3000
const dbUrl = 'mongodb://127.0.0.1:27017/live-fit'

const { Activity, getTodaysDate } = require('./models/Activity')

const app = express()

mongoose.connect(dbUrl, {
    useNewUrlParser: true
})

app.use(express.json());

app.get('/', async (req, res) => {
    const todaysDate = getTodaysDate()
    const todaysData = await Activity.findOne({ date: todaysDate })
    res.status(200).send(todaysData.data)
})

app.patch('/activity/steps', async (req, res) => {
    const todaysDate = getTodaysDate()
    const updatedData = await Activity.findOneAndUpdate({ date: todaysDate }, { $set: { 'data.steps': +req.body.steps } }, { new: true })
    await updatedData.save()
    res.status(200).send(updatedData.data)
})

app.patch('/activity/activemins', async (req, res) => {
    const todaysDate = getTodaysDate()
    const updatedData = await Activity.findOneAndUpdate({ date: todaysDate }, { $set: { 'data.activeMinutes': +req.body.activeMinutes } }, { new: true })
    await updatedData.save()
    res.status(200).send(updatedData.data)
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
