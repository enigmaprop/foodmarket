const express = require('express');
const router = express.Router();
const authMiddleWare = require('../auth/authorizationMiddleware')

const {
    adminAuth ,
    signAdmin ,
    loginAdmin ,

} = require('../controller/adminsController');


router.post('/' , adminAuth)
      .post('/login' , loginAdmin)
      .post('/sign' , authMiddleWare , signAdmin)


module.exports = router;