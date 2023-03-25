const mongoose = require('mongoose');
const Model = mongoose.model;

const userSchema = mongoose.Schema({
    id: {
        type: String ,
        require: true ,
        dropDups: true ,
        unique: true ,
    } ,
    name: {
        type: String ,
        require: true ,
    } ,
    phoneNumber: {
        type: String ,
        require: true ,
        dropDups: true ,
        unique: true ,
        
    } ,
    password: {
        type: String , 
        require: true ,
    } ,
    points: Number ,
    
    offers: [ String ] ,
})

const User = new Model('users' , userSchema);

module.exports = User ;