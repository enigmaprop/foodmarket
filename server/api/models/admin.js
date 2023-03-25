const mongoose = require('mongoose');
const Model = mongoose.model;

const AdminSchema = mongoose.Schema({
    name:{
        type: String ,
        require: true ,
        dropDups: true ,
        unique: true ,
    } ,
    password:{
        type: String ,
        require: true ,
    } ,
    key:{
        type: String ,
        require: true ,
        dropDups: true ,
        unique: true ,
    }
})

const Admin = new Model('admins' , AdminSchema);

module.exports = Admin ;