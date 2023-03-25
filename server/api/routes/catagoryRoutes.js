const express = require('express');
const router = express.Router();
const authMiddleWare = require('../auth/authorizationMiddleware')

const {
    getCatagories ,
    addCatagory ,
    deleteCatagory ,
} = require('../controller/catagoriesController');

router.get('/' , getCatagories)
     .post('/addCategory' , authMiddleWare , addCatagory)
     .delete('/deleteCategory/:name' , authMiddleWare , deleteCatagory);

module.exports = router;