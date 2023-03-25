const mongoose = require('mongoose');
const Model = mongoose.model;

const orderSchema = mongoose.Schema({
    id:{
        type:String ,
        require: true ,
        dropDups: true ,
        unique: true ,
    } ,
    firstName:{
        type:String ,
        require: true
    } ,
    lastName:{
        type:String ,
        require: true
    } ,
    city:{
        type:String ,
        require: true
    } ,
    discount:{
        type:Number ,
        require: true
    } ,
    address:{
        type:String ,
        require: true
    } ,
    phoneNumber:{
        type:String ,
        require: true
    } ,
    date: {
        type: Date ,
        require: true
    } ,
    products:[
        {
            peoductId:{
                type:String ,
                require: true
            } ,
            productName:{
                type:String ,
                require: true
            } ,
            quantity:{
                type:Number ,
                require: true
            } ,
            unitPrice:{
                type:Number ,
                require: true
            } ,
            totalPrice:{
                type:Number ,
                require: true
            }
        }
    ]

});


const Orders = new Model('orders' , orderSchema);

module.exports = Orders;