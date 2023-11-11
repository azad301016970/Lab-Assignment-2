const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/Marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('MongoDB connection error:', error);
});

// Define the Product schema and model in a 'models/Product.js' file.

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new product
app.post('/api/products', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update product by ID
app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product by ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });
    if (deletedProduct.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE all products
app.delete('/api/products', async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET products by name
app.get('/api/productbyname', async (req, res) => {
  console.log(req.query);
  try {
    const keyword = req.query.name;
    const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
