-- Drop dependent tables first due to foreign key constraints
DROP TABLE IF EXISTS public.votos;
DROP TABLE IF EXISTS public.diputados;
DROP TABLE IF EXISTS public.votaciones;
DROP TABLE IF EXISTS public.grupos_parlamentarios;
DROP TABLE IF EXISTS public.sesiones;
DROP TABLE IF EXISTS public.proponentes;
DROP TABLE IF EXISTS public.categorias;
DROP TABLE IF EXISTS public.subcategorias;
DROP TABLE IF EXISTS public.votaciones_subcategorias;


-- Sesiones
CREATE TABLE sesiones (
    id_sesion INTEGER PRIMARY KEY,
    fecha DATE,
    numero_sesion INTEGER
);

-- Votaciones
CREATE TABLE votaciones (
    id_votacion SERIAL PRIMARY KEY,
    id_sesion INTEGER REFERENCES sesiones(id_sesion),
    numero_votacion INTEGER,
    titulo TEXT,
    texto_expediente TEXT,
    presentes INTEGER,
    a_favor INTEGER,
    en_contra INTEGER,
    abstenciones INTEGER,
    no_votan INTEGER
);

-- Grupos parlamentarios
CREATE TABLE grupos_parlamentarios (
    id_grupo SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    color VARCHAR(20),
    order INTEGER
);

-- Diputados
CREATE TABLE diputados (
    id_diputado SERIAL PRIMARY KEY,
    nombre TEXT,
    id_grupo INTEGER REFERENCES grupos_parlamentarios(id_grupo)
);

-- Votos individuales
CREATE TABLE votos (
    id_voto SERIAL PRIMARY KEY,
    id_votacion INTEGER REFERENCES votaciones(id_votacion),
    id_diputado INTEGER REFERENCES diputados(id_diputado),
    asiento VARCHAR(10),
    voto VARCHAR(20)
);

-- Proponentes
CREATE TABLE proponentes (
    id_votacion INTEGER REFERENCES votaciones(id_votacion),
    id_grupo INTEGER REFERENCES grupos_parlamentarios(id_grupo),
    PRIMARY KEY (id_votacion, id_grupo)
);

-- Categorias de votaciones
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria TEXT,
    color TEXT
);

-- Subcategorias de votaciones
CREATE TABLE subcategorias (
    id_subcategoria SERIAL PRIMARY KEY,
    id_categoria INTEGER REFERENCES categorias(id_categoria),
    nombre_subcategoria TEXT
);

-- Votaciones por subcategorias
CREATE TABLE votaciones_subcategorias (
    id_votacion INTEGER REFERENCES votaciones(id_votacion),
    id_subcategoria INTEGER REFERENCES subcategorias(id_subcategoria),
    PRIMARY KEY (id_votacion, id_subcategoria)
);


-- Add indexes for unindexed foreign keys
CREATE INDEX idx_votaciones_id_sesion ON votaciones(id_sesion);
CREATE INDEX idx_diputados_id_grupo ON diputados(id_grupo);
CREATE INDEX idx_votos_id_votacion ON votos(id_votacion);
CREATE INDEX idx_votos_id_diputado ON votos(id_diputado);
CREATE INDEX idx_proponentes_id_votacion ON proponentes(id_votacion);
CREATE INDEX idx_proponentes_id_grupo ON proponentes(id_grupo);
CREATE INDEX idx_subcategorias_id_categoria ON subcategorias(id_categoria);
CREATE INDEX idx_votaciones_subcategorias_id_votacion ON votaciones_subcategorias(id_votacion);
CREATE INDEX idx_votaciones_subcategorias_id_subcategoria ON votaciones_subcategorias(id_subcategoria);


-- Enable RLS and create public read policy for sesiones
ALTER TABLE public.sesiones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read sesiones"
ON public.sesiones
FOR SELECT TO anon
USING (true);


-- Enable RLS and create public read policy for votaciones
ALTER TABLE public.votaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read votaciones"
ON public.votaciones
FOR SELECT TO anon
USING (true);


-- Enable RLS and create public read policy for grupos_parlamentarios
ALTER TABLE public.grupos_parlamentarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read grupos_parlamentarios"
ON public.grupos_parlamentarios
FOR SELECT TO anon
USING (true);



-- Enable RLS and create public read policy for diputados
ALTER TABLE public.diputados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read diputados"
ON public.diputados
FOR SELECT TO anon
USING (true);



-- Enable RLS and create public read policy for votos
ALTER TABLE public.votos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read votos"
ON public.votos
FOR SELECT TO anon
USING (true);


-- Enable RLS and create public read policy for proponentes
ALTER TABLE public.proponentes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read proponentes"
ON public.proponentes
FOR SELECT TO anon
USING (true);



-- Enable RLS and create public read policy for categorias
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read categorias"
ON public.categorias
FOR SELECT TO anon
USING (true);


-- Enable RLS and create public read policy for subcategorias
ALTER TABLE public.subcategorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read subcategorias"
ON public.subcategorias
FOR SELECT TO anon
USING (true);


-- Enable RLS and create public read policy for votaciones_subcategorias
ALTER TABLE public.votaciones_subcategorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read votaciones_subcategorias"
ON public.votaciones_subcategorias
FOR SELECT TO anon
USING (true);



