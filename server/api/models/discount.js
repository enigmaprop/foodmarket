const mongoose = require('mongoose');
const Model = mongoose.model;

const discountSchema = mongoose.Schema({
    id: {
        type: String ,
        require: true ,
        dropDups: true ,
        unique: true ,
    } ,
    value: {
        type: Number ,
        require: true ,
    } ,
    cost: {
        type: Number ,
        require: true ,
    }
})

const Discount = new Model('discounts' , discountSchema);

module.exports = Discount ;