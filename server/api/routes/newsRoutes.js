const express = require('express');
const adminAuth = require('../auth/authorizationMiddleware');

const {

    addNews ,
    getNews ,

} = require('../controller/newsController');

const router = express.Router();

router.get('/addNews/:news' , adminAuth , addNews)
      .get('/getNews' , getNews);

module.exports = router;
