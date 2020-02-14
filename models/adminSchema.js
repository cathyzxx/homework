const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
  uname :String,
  pwd : String,
}, { collection: 'myadmin'})

const User = module.exports = mongoose.model('admin',adminSchema);
