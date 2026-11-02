// CONTROLLER DE PRODUCTOS
const model = require('../models/productosModel');

async function verCategorias(req, res) {
  try {
    const categorias = await model.obtenerCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).send('Error al obtener las categorias');
  }
}

// GET /productos  o  GET /productos?categoria=2
async function verProductos(req, res) {
  const categoriaId = req.query.categoria ? Number(req.query.categoria) : null;
  try {
    const productos = await model.obtenerProductos(categoriaId);
    res.status(200).json(productos);
  } catch (error) {
    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send('Error al obtener los productos');
  }
}

module.exports = { verCategorias, verProductos };
