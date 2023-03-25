const express = require('express');
const router = express.Router();
const authMiddleWare = require('../auth/authorizationMiddleware')

const {
  addProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByName,
  deleteProduct,
} = require('../controller/productsController');


router.get('/', getAllProducts);
router.get('/byName/:name', getProductsByName);
router.get('/byId/:id', getProductById);
router.get('/byCategory/:category', getProductsByCategory);

router.post('/addProduct', authMiddleWare , addProduct);

router.delete('/deleteProduct/:id', authMiddleWare , deleteProduct);

module.exports = router;
