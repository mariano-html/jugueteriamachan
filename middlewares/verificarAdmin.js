const supabase = require('../config/supabaseClient');

async function verificarAdmin(req, res, next) {
  if (!req.usuario || !req.usuario.id) {
    return res.status(401).send('Tenes que iniciar sesion');
  }

  const { data, error } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', req.usuario.id)
    .single();

  if (error || !data || data.rol !== 'admin') {
    return res.status(403).send('No tenes permisos de administrador');
  }

  req.usuario.rol = data.rol;
  next();
}

module.exports = verificarAdmin;
