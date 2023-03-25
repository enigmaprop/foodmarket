const mongoose = require('mongoose');
const Model = mongoose.model;

const productSchema = mongoose.Schema({
    id: {
        type:String,
        require: true ,
        dropDups: true ,
        unique: true ,
    } ,
    name: {
        type:String,
        require: true
    } ,
    catagory: {
        type:String,
        require: true
    } ,
    price: {
        type:Number,
        require:true
    },
    description: {
        type:String,
        require: true
    } ,
    image: {
        path:  {
            type:String,
            require: true
        } ,
        name:  {
            type:String,
            require: true
        } ,
        contentType:  {
            type:String,
            require: true
        } , 
    } ,
    discount:{
        type: Number ,
    }
})

const Product = new Model('product' , productSchema);

module.exports = Product;