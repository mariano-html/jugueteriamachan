// MODEL DE USUARIOS: registro y login con Supabase Auth
const { createClient } = require('@supabase/supabase-js');
const supabase = require('../config/supabaseClient');
const { faltaImplementar } = require('../utils/errores');

// Registro: Auth crea el usuario y nosotros guardamos su perfil
async function registrar(email, password, nombre) {
const { data, error } = await supabase.auth.admin.createUser({
 email,
 password,
 email_confirm: true // no pedimos confirmar por mail
 });
 if (error) throw error;
 const { error: e2 } = await supabase.from('perfiles')
 .insert({ id: data.user.id, nombre });
 if (e2) throw e2;
 return data.user;

}

// Login: devuelve el token, o null si los datos no coinciden
async function iniciarSesion(email, password) {
const temporal = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_KEY,
 { auth: { persistSession: false } }
 );
 const { data, error } =
 await temporal.auth.signInWithPassword({ email, password
});
 if (error) return null; // datos incorrectos
 return data.session.access_token;
}

module.exports = { registrar, iniciarSesion };
