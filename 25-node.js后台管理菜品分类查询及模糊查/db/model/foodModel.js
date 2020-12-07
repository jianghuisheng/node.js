const mongoose = require('mongoose')
var foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  desc: { type: String, required: true },
  typename: { type: String, required: true },
  typeid: { type: Number, required: true },
  img: { type: String, required: true },
  ctime: String
})
var Food = mongoose.model('foods', foodSchema)

module.exports = Food
