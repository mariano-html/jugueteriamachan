// MODEL DE PRODUCTOS: el catalogo
const supabase = require('../config/supabaseClient');
const { faltaImplementar } = require('../utils/errores');

// Las categorias para el filtro del front (ya resuelto)
async function obtenerCategorias() {
  const { data, error } = await supabase
    .from('categorias')
    .select('id, nombre')
    .order('nombre');
  if (error) throw error;
  return data;
}

// Los productos activos, con el nombre de su categoria.
// Si llega categoriaId, filtra por esa categoria.
async function obtenerProductos(categoriaId) {
   const columnas = 'id, nombre, descripcion, precio, stock,' +
 ' imagen_url, categorias(nombre)';
 let consulta = supabase
 .from('productos')
 .select(columnas)
 .eq('activo', true)
 .order('nombre');
 if (categoriaId) {
 consulta = consulta.eq('categoria_id', categoriaId);
 }
 const { data, error } = await consulta;
 if (error) throw error;
 return data;
}

module.exports = { obtenerCategorias, obtenerProductos };
