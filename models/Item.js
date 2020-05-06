const mongoose = require('mongoose')

const schem = new mongoose.Schema({
    name:{type:String},
    icon:{type:String},
    
})

module.exports = mongoose.model('Item',schem)