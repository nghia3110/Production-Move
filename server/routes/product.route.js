const express = require('express');

const router = express.Router();
const ProductController = require('../controllers/Product.Controller');

router.get('/', ProductController.getAllProduct);
router.get('/quantity/:id', ProductController.getQuantityByID);
router.get('/:id', ProductController.getProductByWarehouse);
router.get('/error/:id', ProductController.getProductErrorInAgency);
router.get('/detail/:imei', ProductController.getProductDetail);
router.get('/count/productline', ProductController.countProductline);
router.get('/count/status', ProductController.countProductByStatus);
router.get('/count/factory', ProductController.countProductByFactory);
router.get('/count/agency', ProductController.countProductByAgency);
router.get('/count/guarantee', ProductController.countProductByGuarantee);
router.post('/addProduct', ProductController.addProduct);
router.put('/distribute', ProductController.distributeProduct);
router.put('/guarantee', ProductController.guaranteeProduct);
router.put('/sell', ProductController.sellProduct);
router.put('/giveback', ProductController.givebackProduct);
router.put('/receiveFromFactory', ProductController.receiveProductsFromFactory);

module.exports = router;