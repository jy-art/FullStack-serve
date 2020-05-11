const mongoose = require('mongoose')

const schem = new mongoose.Schema({
    name:{type:String},
    items:[{
        image:{type:String},
        url:{type:String}
    }]
})

module.exports = mongoose.model('Ad',schem)