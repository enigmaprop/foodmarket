const mongoose = require('mongoose');
const Model = mongoose.model;

const catagorySchema = mongoose.Schema({
    name: {
        type: String , 
        require: true ,
        dropDups: true ,
        unique: true ,
    },
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
    }
})

const Catagory = new Model('catagory' , catagorySchema);

module.exports = Catagory;