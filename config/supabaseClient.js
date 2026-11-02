// CONEXION A SUPABASE
// Se crea el cliente UNA vez y se comparte con todo el proyecto.
// Usa la clave SECRETA: solo vive en el servidor, nunca en el front.
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

module.exports = supabase;
