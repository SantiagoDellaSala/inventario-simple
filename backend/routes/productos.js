const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} = require('../controllers/productoController');

router.use(authenticateToken);

router.get('/', getProductos);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;
