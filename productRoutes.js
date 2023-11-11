const express = require('express');
const router = express.Router();
const productController = require('./productController');

// GET all products
router.get('/api/products', productController.getProducts);

// GET product by ID
router.get('/api/products/:id', productController.getProductById);

// POST add new product
router.post('/api/products', productController.addProduct);

// PUT update product by ID
router.put('/api/products/:id', productController.updateProduct);

// DELETE product by ID
router.delete('/api/products/:id', productController.deleteProduct);

// DELETE all products
router.delete('/api/products', productController.deleteAllProducts);

// GET products by name
router.get('/api/products', productController.getProductsByName);

module.exports = router;
