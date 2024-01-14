const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        max:200,
    },
    body:{
        type:String,
        required:true
    },

},{timestamps:true})

module.exports = mongoose.model('Book',BookSchema)