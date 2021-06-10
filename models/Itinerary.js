const mongoose = require('mongoose')
const itinerarySchema = new mongoose.Schema({
    itineraryImage:{type:String, required: true},
    tittle: {type:String, required: true},
    authorName: {type: String, required: true},
    authorImage: {type: String, required: true},
    description: {type: String, required: true},
    price:{type: Number, required: true, min:1, max:5},
    duration:{type: Number, required: true, min:1},
    hashtags:[{type:String, required:true}],
    likes: {type:Number, default:0},
    userLiked: [{type:String}],
    comments:[{userId:{type: mongoose.Types.ObjectId, ref: 'user'}, comment:{type:String, required:true}}],
    idCity: {type: mongoose.Types.ObjectId, ref: 'city'},
})
const Itinerary = mongoose.model('itinerary', itinerarySchema)
module.exports = Itinerary		
