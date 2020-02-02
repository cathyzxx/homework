const mongoose = require('mongoose')

const albumSchema = mongoose.Schema({
  albumName : String,
  price : Number,
  location : String,
  singers : String,
  albumYear : [],
  
}, { collection: 'myalbum'})
const Album = module.exports = mongoose.model('album',albumSchema);
