// MODEL DE PEDIDOS: la compra
const supabase = require('../config/supabaseClient');
const { faltaImplementar } = require('../utils/errores');

// Un error que es culpa del cliente: el controller lo responde con 400
function errorCliente(mensaje) {
  const e = new Error(mensaje);
  e.status = 400;
  return e;
}

// Registra una compra completa:
// busca productos, controla stock, calcula el total, guarda pedido e items
// y descuenta el stock. items = [ { producto_id, cantidad }, ... ]
async function crearPedido(usuarioId, items) {
  const ids = items.map(i => i.producto_id);
  const { data: productos, error: e1 } = await supabase
    .from('productos')
    .select('id, nombre, precio, stock')
    .in('id', ids)
    .eq('activo', true);

  if (e1) throw e1;

  let total = 0;
  const filas = [];

  for (const item of items) {
    const p = productos.find(x => x.id === item.producto_id);

    if (!p) throw errorCliente('No existe el producto ' + item.producto_id);
    if (!Number.isInteger(item.cantidad) || item.cantidad < 1) {
      throw errorCliente('Cantidad invalida para ' + p.nombre);
    }
    if (p.stock < item.cantidad) throw errorCliente('Sin stock de ' + p.nombre);

    total += p.precio * item.cantidad;
    filas.push({
      producto_id: p.id,
      cantidad: item.cantidad,
      precio_unitario: p.precio
    });
  }

  const { data: pedido, error: e2 } = await supabase
    .from('pedidos')
    .insert({ usuario_id: usuarioId, total })
    .select()
    .single();

  if (e2) throw e2;

  const conPedido = filas.map(f => ({ ...f, pedido_id: pedido.id }));
  const { error: e3 } = await supabase
    .from('pedido_items')
    .insert(conPedido);

  if (e3) throw e3;

  for (const f of filas) {
    const p = productos.find(x => x.id === f.producto_id);
    await supabase
      .from('productos')
      .update({ stock: p.stock - f.cantidad })
      .eq('id', p.id);
  }

  return pedido;
}

module.exports = { crearPedido };
