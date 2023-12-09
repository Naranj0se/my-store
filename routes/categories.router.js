const express = require('express');

const router = express.Router();

router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json(
    {
      productId,
      categoryId
    }
  )
});

module.exports = router;
