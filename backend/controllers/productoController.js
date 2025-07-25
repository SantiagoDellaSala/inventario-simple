// backend/controllers/productoController.js
const { Producto } = require('../models');

const getProductos = async (req, res) => {
  const productos = await Producto.findAll({ where: { UserId: req.user.id } });
  res.json(productos);
};

const createProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  if (!nombre || !descripcion || !precio || !stock) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const producto = await Producto.create({
    nombre,
    descripcion,
    precio,
    stock,
    UserId: req.user.id,
  });

  res.status(201).json(producto);
};

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findOne({ where: { id, UserId: req.user.id } });

  if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

  await producto.update(req.body);
  res.json(producto);
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findOne({ where: { id, UserId: req.user.id } });

  if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

  await producto.destroy();
  res.json({ message: 'Producto eliminado' });
};

module.exports = {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
};
