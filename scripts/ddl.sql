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
    nombre VARCHAR(50)
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