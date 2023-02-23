const express = require('express')
const mongoose = require('mongoose')
const port = 3000
const dbUrl = 'mongodb://127.0.0.1:27017/live-fit'

const { Activity, getTodaysDate } = require('./models/Activity')
const Post = require('./models/Post')

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

// req.body = { "steps": "6000" }
app.patch('/activity/steps', async (req, res) => {
    const todaysDate = getTodaysDate()
    const dataToUpdate = await Activity.findOne({ date: todaysDate })
    if (!dataToUpdate) {
        const newData = new Activity({ data: { steps: +req.body.steps } })
        await newData.save()
        res.status(200).send(newData)
    } else {
        dataToUpdate.data.steps = +req.body.steps
        await dataToUpdate.save()
        res.status(200).send(dataToUpdate)
    }
})

// req.body = { "activeMinutes": "25" }
app.patch('/activity/activemins', async (req, res) => {
    const todaysDate = getTodaysDate()
    const dataToUpdate = await Activity.findOne({ date: todaysDate })
    if (!dataToUpdate) {
        const newData = new Activity({ data: { activeMinutes: +req.body.activeMinutes } })
        await newData.save()
        res.status(200).send(newData)
    } else {
        dataToUpdate.data.activeMinutes = +req.body.activeMinutes
        await dataToUpdate.save()
        res.status(200).send(dataToUpdate)
    }
})

// req.body = { "name": "Yoga", "duration": "45" }
app.patch('/activity/activities', async (req, res) => {
    const todaysDate = getTodaysDate()
    const dataToUpdate = await Activity.findOne({ date: todaysDate })
    if (!dataToUpdate) {
        const newData = new Activity({ data: { activities: [{ name: req.body.name, duration: +req.body.duration }] } })
        await newData.save()
        res.status(200).send(newData)
    } else {
        dataToUpdate.data.activities.push({ name: req.body.name, duration: +req.body.duration })
        await dataToUpdate.save()
        res.status(200).send(dataToUpdate)
    }
})

// req.body = { "text": "I achieved my goal of 10,000 steps today!" }
app.post('/posts', async (req, res) => {
    const newPost = new Post(req.body)
    await newPost.save()
    res.status(201).send(newPost)
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
