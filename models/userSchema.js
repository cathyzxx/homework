const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  uname :String,
  pwd : String,
  fav:[],
}, { collection: 'myuser'})

const User = module.exports = mongoose.model('user',userSchema);
