const express = require('express');

const router = express.Router();

const ProductsService = require('../services/products.service');

const validatorHandler = require('../middlewares/validator.handler');

const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');

const service = new ProductsService();

/*
router.get('/products', (req, res) => {
  res.json([
    {
      name: 'Producto1',
      price: 2000
    },
    {
      name: 'Producto2',
      price: 1500
    },
    {
      name: 'Producto3',
      price: 1000
    },
    {
      name: 'Producto4',
      price: 100
    }
  ])
})
*/

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/', async (req, res) => {
  const products = await service.find();

  res.json(products);
});

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',validatorHandler(createProductSchema, 'body'), async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);

  res.status(201).json(newProduct);
});

router.patch('/:id',validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
  res.json(response);
});

module.exports = router;
