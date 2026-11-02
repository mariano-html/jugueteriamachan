# Tienda · TP integrador de Diseño Backend 2026

Plantilla de arranque del e-commerce: **Express + Supabase + front en JavaScript**,
lista para desplegar en **Vercel**. La estructura, el front y el diseño ya están armados.
Ustedes completan las partes que conectan todo, marcadas con `TODO`.

## Estructura

    tienda/
    ├── config/supabaseClient.js        la conexión a Supabase (clave secreta)
    ├── middlewares/verificarUsuario.js ¿quién compra?                  [TODO]
    ├── models/
    │   ├── productosModel.js           el catálogo                     [TODO]
    │   ├── authModel.js                registro y login con Auth       [TODO]
    │   └── pedidosModel.js             la compra                       [TODO]
    ├── controllers/                    validan y arman las respuestas  (listos)
    ├── routes/tiendaRoutes.js          el mapa de rutas                (listo)
    ├── utils/errores.js                errores con código              (listo)
    ├── public/
    │   ├── index.html                  la página                       (lista)
    │   ├── estilos.css                 los colores de la tienda        (listos)
    │   └── app.js                      el front con fetch              [TODO]
    ├── db/esquema.sql                  las tablas y datos de ejemplo
    ├── index.js                        el servidor (local y Vercel)
    ├── .env.example                    modelo de credenciales
    └── package.json

## Qué completa cada uno (y cuándo)

Cada `TODO` responde **501 Falta implementar** hasta que lo completen,
así la tienda arranca desde el primer día y van viendo qué falta.

| Archivo | Función | Clase |
|---|---|---|
| `models/productosModel.js` | `obtenerProductos` | Clase 2 · Pasos 5 y 6 |
| `models/authModel.js` | `registrar` e `iniciarSesion` | Clase 2 · Paso 4 |
| `middlewares/verificarUsuario.js` | `verificarUsuario` | Clase 2 · Paso 4 |
| `models/pedidosModel.js` | `crearPedido` | Clase 2 · Paso 8 |
| `public/app.js` | `cargarProductos`, `registrar`, `iniciarSesion`, `comprar` | Clase 3 |

Reemplacen la línea `throw faltaImplementar(...)` (o el `return res.status(501)...`)
por el código de la práctica.

## Puesta en marcha

1. **Base.** Crear un proyecto nuevo en Supabase (región São Paulo) y correr
   `db/esquema.sql` en el **SQL Editor**.
2. **Imágenes.** En **Storage**, crear un bucket público llamado `productos`,
   subir las fotos y guardar cada URL en `imagen_url`.
3. **Credenciales.** Copiar `.env.example` como `.env` y completar la URL
   y la **clave secreta** (Project Settings → API Keys).
4. **Instalar y levantar:**

        npm install
        npm start

5. Abrir http://localhost:3000

## Las rutas

| Método | Ruta | Qué hace | Protegida |
|---|---|---|---|
| POST | `/registro` | crea un usuario | no |
| POST | `/login` | devuelve el token | no |
| GET | `/categorias` | lista las categorías | no |
| GET | `/productos` | lista los productos (`?categoria=2` filtra) | no |
| POST | `/pedidos` | registra una compra | **sí** (token) |

## Deploy en Vercel

1. Subir el proyecto a un repositorio de GitHub (el `.gitignore` ya deja afuera
   `node_modules` y `.env`).
2. En Vercel: **Add New → Project**, elegir el repositorio. Vercel detecta Express solo.
3. En **Environment Variables**, cargar `SUPABASE_URL` y `SUPABASE_KEY`
   con los mismos valores del `.env`.
4. **Deploy.** Vercel sirve la carpeta `public/` y ejecuta la API.

## Adaptarla a tu rubro

- Nombre de la tienda: `<title>` y `<h1>` en `public/index.html`.
- Colores: las variables del principio de `public/estilos.css`.
- Categorías y productos: los `insert` de `db/esquema.sql`, o el Table Editor.

## Mínimo obligatorio del TP

- [ ] Catálogo con imágenes y filtro por categoría
- [ ] Carrito
- [ ] Registro y login
- [ ] Compra que controla el stock y calcula el total en el backend
- [ ] Deploy en Vercel funcionando
- [ ] Este README actualizado con el link del deploy y los integrantes

## Extras para mejor nota

- Panel admin con rol (`perfiles.rol = 'admin'`, responde 403 a los clientes)
- Buscador por nombre
- "Mis pedidos"
- Página de detalle de producto

---
Integrantes: _completar_ · Link del deploy: _completar_

Prof. Julia Panei · UTN Neuquén · Diseño Backend 2026
