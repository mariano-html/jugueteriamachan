-- =========================================================
-- BASE DE LA TIENDA
-- Pegalo en el SQL Editor de Supabase y apreta Run.
-- Despues cambia las categorias y los productos por los de tu rubro.
-- =========================================================

-- ===== TABLAS =====
create table categorias (
  id     bigint generated always as identity primary key,
  nombre text not null unique
);

create table productos (
  id           bigint generated always as identity primary key,
  nombre       text not null,
  descripcion  text,
  precio       numeric(10,2) not null check (precio >= 0),
  stock        int not null default 0 check (stock >= 0),
  imagen_url   text,
  categoria_id bigint references categorias(id),
  activo       boolean not null default true
);

-- Los usuarios los maneja Supabase Auth (auth.users).
-- Aca guardamos lo que Auth no guarda: el nombre y el rol.
create table perfiles (
  id     uuid primary key references auth.users(id) on delete cascade,
  nombre text not null,
  rol    text not null default 'cliente' check (rol in ('cliente', 'admin'))
);

create table pedidos (
  id         bigint generated always as identity primary key,
  usuario_id uuid not null references auth.users(id),
  total      numeric(10,2) not null check (total >= 0),
  estado     text not null default 'pendiente'
             check (estado in ('pendiente', 'confirmado', 'cancelado')),
  creado     timestamptz not null default now()
);

create table pedido_items (
  id              bigint generated always as identity primary key,
  pedido_id       bigint not null references pedidos(id) on delete cascade,
  producto_id     bigint not null references productos(id),
  cantidad        int not null check (cantidad > 0),
  precio_unitario numeric(10,2) not null check (precio_unitario >= 0)  -- la foto del precio
);

-- ===== SEGURIDAD: cerramos las tablas al publico =====
-- Con la clave publica no se puede leer ni escribir nada.
-- Nuestro backend entra igual porque usa la clave secreta.
alter table categorias   enable row level security;
alter table productos    enable row level security;
alter table perfiles     enable row level security;
alter table pedidos      enable row level security;
alter table pedido_items enable row level security;

-- ===== DATOS DE EJEMPLO (cambialos por los de tu rubro) =====
insert into categorias (nombre) values ('Audio'), ('Computación'), ('Accesorios');

insert into productos (nombre, descripcion, precio, stock, categoria_id) values
  ('Auriculares inalámbricos', 'Bluetooth, 20 h de batería', 20000, 12, 1),
  ('Parlante portátil',        'Resistente al agua',         35000,  5, 1),
  ('Teclado mecánico',         'Switches rojos',             48000,  7, 2),
  ('Mouse inalámbrico',        'Silencioso',                 15000, 20, 2),
  ('Funda para notebook',      'Para 15 pulgadas',            9000, 30, 3);

-- ===== IMAGENES =====
-- Subi las fotos al bucket publico "productos" de Storage y guarda cada URL:
-- update productos
-- set imagen_url = 'https://xxxx.supabase.co/storage/v1/object/public/productos/auriculares.jpg'
-- where id = 1;
