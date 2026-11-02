// MIDDLEWARE: ¿quien compra?
// Va entre la ruta y el controller. Si no hay token valido, corta con 401.
// Si todo esta bien, deja el usuario en req.usuario y sigue.
const supabase = require('../config/supabaseClient');

async function verificarUsuario(req, res, next) {
 const header = req.headers.authorization || '';
 const token = header.replace('Bearer ', '');
 if (!token) return res.status(401).send('Tenes que iniciar sesion');
 const { data, error } = await supabase.auth.getUser(token);
 if (error || !data.user) return res.status(401).send('Sesion invalida');
 req.usuario = data.user; // desde aca, el controller sabe quien compra
 next();

}

module.exports = verificarUsuario;
