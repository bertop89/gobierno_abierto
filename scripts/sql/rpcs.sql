CREATE OR REPLACE FUNCTION votos_cruzados_por_grupo()
RETURNS TABLE (
    grupo_proponente TEXT,
    grupo_proponente_order INTEGER,
    grupo_votante TEXT,
    grupo_votante_order INTEGER,
    voto TEXT,
    cantidad_votos INTEGER,
    total_votos INTEGER,
    porcentaje NUMERIC
)
LANGUAGE sql
AS $$
  SELECT
    gp_prop.nombre AS grupo_proponente,
    gp_prop.order AS grupo_proponente_order,
    gp_vot.nombre AS grupo_votante,
    gp_vot.order AS grupo_votante_order,
    v.voto,
    COUNT(*) AS cantidad_votos,
    SUM(COUNT(*)) OVER (
      PARTITION BY gp_prop.nombre, gp_vot.nombre
    ) AS total_votos,
    ROUND(
      100.0 * COUNT(*)::NUMERIC / SUM(COUNT(*)) OVER (
        PARTITION BY gp_prop.nombre, gp_vot.nombre
      ), 1
    ) AS porcentaje
  FROM votos v
  JOIN diputados d ON v.id_diputado = d.id_diputado
  JOIN grupos_parlamentarios gp_vot ON d.id_grupo = gp_vot.id_grupo
  JOIN proponentes p ON v.id_votacion = p.id_votacion
  JOIN grupos_parlamentarios gp_prop ON p.id_grupo = gp_prop.id_grupo
  GROUP BY gp_prop.nombre, gp_prop.order, gp_vot.nombre, gp_vot.order, v.voto
  ORDER BY grupo_proponente_order, grupo_votante_order;
$$;

--DROP FUNCTION votos_por_diputado();
create or replace function votos_por_diputado()
returns table (
  id_diputado integer,
  diputado text,
  id_grupo integer,
  grupo_parlamentario text,
  total_votos integer,
  votos_si integer,
  votos_no integer,
  votos_abstencion integer,
  porcentaje_si numeric,
  porcentaje_no numeric,
  porcentaje_abstencion numeric
)
language sql
as $$
  SELECT
    d.id_diputado as id_diputado,
    d.nombre as diputado,
    gp.id_grupo as id_grupo,
    gp.nombre AS grupo_parlamentario,
    COUNT(v.id_voto) AS total_votos,
    COUNT(*) FILTER (WHERE v.voto = 'Sí') AS votos_si,
    COUNT(*) FILTER (WHERE v.voto = 'No') AS votos_no,
    COUNT(*) FILTER (WHERE v.voto = 'Abstención') AS votos_abstencion,
    ROUND(100.0 * COUNT(*) FILTER (WHERE v.voto = 'Sí') / COUNT(v.id_voto), 0) AS porcentaje_si,
    ROUND(100.0 * COUNT(*) FILTER (WHERE v.voto = 'No') / COUNT(v.id_voto), 0) AS porcentaje_no,
    ROUND(100.0 * COUNT(*) FILTER (WHERE v.voto = 'Abstención') / COUNT(v.id_voto), 0) AS porcentaje_abstencion
  FROM votos v
  JOIN diputados d ON v.id_diputado = d.id_diputado
  JOIN grupos_parlamentarios gp ON d.id_grupo = gp.id_grupo
  GROUP BY d.id_diputado, d.nombre, gp.id_grupo, gp.nombre
  ORDER BY d.nombre;
$$;

--DROP FUNCTION IF EXISTS votos_por_grupo();
CREATE OR REPLACE FUNCTION votos_por_grupo()
RETURNS TABLE (
  id_grupo INTEGER,
  grupo_parlamentario TEXT,
  color TEXT,
  diputados INTEGER,
  total_votos INTEGER,
  votos_si INTEGER,
  votos_no INTEGER,
  votos_abstencion INTEGER,
  porcentaje_si NUMERIC,
  porcentaje_no NUMERIC,
  porcentaje_abstencion NUMERIC,
  proposiciones_presentadas INTEGER
)
LANGUAGE sql
AS $$
WITH votos_agg AS (
  SELECT
    d.id_grupo,
    COUNT(*) AS total_votos,
    COUNT(*) FILTER (WHERE v.voto = 'Sí') AS votos_si,
    COUNT(*) FILTER (WHERE v.voto = 'No') AS votos_no,
    COUNT(*) FILTER (WHERE v.voto = 'Abstención') AS votos_abstencion
  FROM votos v
  JOIN diputados d ON v.id_diputado = d.id_diputado
  GROUP BY d.id_grupo
),
diputados_agg AS (
  SELECT
    id_grupo,
    COUNT(*) AS diputados
  FROM diputados
  GROUP BY id_grupo
),
proposiciones_agg AS (
  SELECT
    id_grupo,
    COUNT(DISTINCT id_votacion) AS proposiciones_presentadas
  FROM proponentes
  GROUP BY id_grupo
)
SELECT
  gp.id_grupo,
  gp.nombre AS grupo_parlamentario,
  gp.color,
  COALESCE(d.diputados, 0),
  COALESCE(v.total_votos, 0),
  COALESCE(v.votos_si, 0),
  COALESCE(v.votos_no, 0),
  COALESCE(v.votos_abstencion, 0),
  CASE WHEN v.total_votos > 0 THEN ROUND(100.0 * v.votos_si / v.total_votos, 0) ELSE 0 END,
  CASE WHEN v.total_votos > 0 THEN ROUND(100.0 * v.votos_no / v.total_votos, 0) ELSE 0 END,
  CASE WHEN v.total_votos > 0 THEN ROUND(100.0 * v.votos_abstencion / v.total_votos, 0) ELSE 0 END,
  COALESCE(p.proposiciones_presentadas, 0)
FROM grupos_parlamentarios gp
LEFT JOIN votos_agg v ON gp.id_grupo = v.id_grupo
LEFT JOIN diputados_agg d ON gp.id_grupo = d.id_grupo
LEFT JOIN proposiciones_agg p ON gp.id_grupo = p.id_grupo
ORDER BY gp.order;
$$;