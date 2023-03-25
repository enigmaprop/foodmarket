const express = require('express');
const router = express.Router();
const userAuthMiddleWare = require('../auth/userAuthMiddleware');
const adminAuthMiddleWare = require('../auth/authorizationMiddleware');

const {

    getGeneralDiscounts ,
    addGeneralDiscount ,
    deleteGeneralDiscountById ,
    deleteProductDiscount ,
    buyDiscount ,
    addProductDiscount ,

} = require('../controller/discountsController');

router.get('/' , getGeneralDiscounts)
      .post('/addGeneralDiscount' , adminAuthMiddleWare , addGeneralDiscount)
      .post('/buyGeneralDiscount' , userAuthMiddleWare , buyDiscount)
      .delete('/deleteGeneralDiscount/:id' , adminAuthMiddleWare , deleteGeneralDiscountById)
      .delete('/deleteProductDiscount/:id' , adminAuthMiddleWare , deleteProductDiscount)
      .get('/addProductDiscount/:id/:discount' , adminAuthMiddleWare , addProductDiscount)

module.exports = router ;