const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authorizationMiddleware');
const userAuth = require('../auth/userAuthMiddleware');
const {
    addUser ,
    getUserById ,
    getUserByName ,
    getUserByPhoneNumber ,
    getUsers ,
    loginUser ,
    deleteUserById ,
    deleteUserByPhone ,
} = require('../controller/usersController');

router.get('/' , authMiddleware , getUsers)
      .get('/byName/:name', authMiddleware , getUserByName)
      .get('/byId/:id', userAuth , getUserById)
      .get('/byPhoneNumber/:phoneNumber', authMiddleware , getUserByPhoneNumber)
      .post('/login' , loginUser)
      .post('/addUser' , addUser)
      .delete('/byId/:id', authMiddleware , deleteUserById)
      .delete('/byPhoneNumber/:phoneNumber', authMiddleware , deleteUserByPhone);


module.exports = router;