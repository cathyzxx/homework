const mongoose = require('mongoose')

const albumSchema = mongoose.Schema({
  albumName : String,
  price : Number,
  singer : [],
  albumYear : String,
  
}, { collection: 'myalbum'})
const Album = module.exports = mongoose.model('album',albumSchema);
