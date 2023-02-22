const mongoose = require('mongoose')

const getTodaysDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const date = today.getDate()
    return new Date(year, month, date)
}

const activitySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: getTodaysDate
    },
    data: {
        steps: {
            type: Number,
            default: 0
        },
        activeMinutes: {
            type: Number,
            default: 0
        },
        activities: [{
            name: {
                type: String,
                required: true
            },
            duration: {
                type: Number
            }
        }]
    }
})

const Activity = mongoose.model('Activity', activitySchema)

module.exports = { 
    Activity,
    getTodaysDate
}