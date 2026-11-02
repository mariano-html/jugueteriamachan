const supabase = require('../config/supabaseClient');

async function listarProductosAdmin(req, res) {
  const { data, error } = await supabase
    .from('productos')
    .select('id, nombre, stock, categoria_id, categorias(nombre)')
    .order('nombre');

  if (error) {
    console.error(error);
    return res.status(500).send('Error al obtener los productos del admin');
  }

  res.status(200).json(data);
}

async function actualizarStockProducto(req, res) {
  const id = Number(req.params.id);
  const stock = Number(req.body.stock);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).send('ID de producto invalido');
  }

  if (!Number.isInteger(stock) || stock < 0) {
    return res.status(400).send('El stock debe ser un número entero mayor o igual a 0');
  }

  const { data, error } = await supabase
    .from('productos')
    .update({ stock })
    .eq('id', id)
    .select('id, nombre, stock')
    .single();

  if (error) {
    console.error(error);
    return res.status(400).send(error.message || 'No se pudo actualizar el stock');
  }

  res.status(200).json(data);
}

module.exports = { listarProductosAdmin, actualizarStockProducto };
