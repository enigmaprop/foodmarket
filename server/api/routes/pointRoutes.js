const express = require('express');
const router = express.Router();
const cors = require('cors');

const userAuth = require('../auth/userAuthMiddleware');
const adminAuth = require('../auth/authorizationMiddleware');

const {

    pointsAdding ,
    dettectPoints ,
    getPoints ,
    deletePoints ,

} = require('../controller/pointsController');


var whitelist = ['http://localhost:3000'];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
 


router.get('/addPoints/:cost/:points' , adminAuth , pointsAdding )
      .get('/dettectPoints/:cost/:id' , cors(corsOptions) , userAuth , dettectPoints )
      .delete('/deletePoints/:cost' , adminAuth , deletePoints)
      .get('/' , adminAuth , getPoints);

module.exports = router;