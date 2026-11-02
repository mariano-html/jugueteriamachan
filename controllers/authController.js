// CONTROLLER DE USUARIOS
const model = require('../models/authModel');

async function registro(req, res) {
  const { email, password, nombre } = req.body;
  if (!email || !password || !nombre || password.length < 6) {
    return res.status(400).send('Faltan datos o la contraseña es muy corta');
  }
  try {
    const usuario = await model.registrar(email, password, nombre);
    res.status(201).json({ id: usuario.id, email: usuario.email });
  } catch (error) {
    if (error.status === 501) return res.status(501).send(error.message);
    res.status(400).send('No se pudo registrar: ' + error.message);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Faltan datos');
  try {
    const token = await model.iniciarSesion(email, password);
    if (!token) return res.status(401).send('Email o contraseña incorrectos');
    res.status(200).json({ token });
  } catch (error) {
    if (error.status) return res.status(error.status).send(error.message);
    res.status(500).send('Error al iniciar sesion');
  }
}

module.exports = { registro, login };
