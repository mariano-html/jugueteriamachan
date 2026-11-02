// CONTROLLER DE PEDIDOS
const model = require('../models/pedidosModel');

// POST /pedidos  (protegida: el usuario sale del token, nunca del body)
async function crearPedido(req, res) {
  const items = req.body.items;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).send('El carrito esta vacio');
  }
  try {
    const pedido = await model.crearPedido(req.usuario.id, items);
    res.status(201).json(pedido);
  } catch (error) {
    console.error(error);
    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send('Error al crear el pedido: ' + error.message);
  }
}

module.exports = { crearPedido };
