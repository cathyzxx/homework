const mongoose = require('mongoose')

const singerSchema = mongoose.Schema({
  singerName :String,
  age : Number,
  singerSex : String,
  album : String,
  singerPosition : [],
}, { collection: 'mysinger'})

const Hero = module.exports = mongoose.model('singer',singerSchema);
