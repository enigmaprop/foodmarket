const mongoose = require('mongoose');
const Model = mongoose.model;

const pointSchema = mongoose.Schema({
    offer:{
        cost: {
            type: Number , 
            dropDups: true ,
            unique: true ,
        } ,
        points: Number ,
    }
})

const Point = new Model('points' , pointSchema);

module.exports = Point;