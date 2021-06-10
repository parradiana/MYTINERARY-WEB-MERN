const mongoose = require ('mongoose')
const activitySchema = new mongoose.Schema({
    activities:[{nameActivity: {type: String}, imageActivity:{type: String}}],
    idItinerary: {type: mongoose.Types.ObjectId, ref: 'itinerary'}
})
const Activity = mongoose.model('activity', activitySchema)
module.exports = Activity	