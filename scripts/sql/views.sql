create or replace view vw_proposiciones_por_grupo_y_categoria as
select
  gp.id_grupo,
  gp.nombre,
  gp.order,
  gp.color,
  c.id_categoria,
  c.nombre_categoria,
  count(distinct case when sc.id_categoria = c.id_categoria then p.id_votacion end) as total_proposiciones
from grupos_parlamentarios gp
cross join categorias c
left join proponentes p on p.id_grupo = gp.id_grupo
left join votaciones_subcategorias vs on vs.id_votacion = p.id_votacion
left join subcategorias sc on sc.id_subcategoria = vs.id_subcategoria
group by gp.id_grupo, gp.nombre, gp.order, gp.color, c.id_categoria, c.nombre_categoria;

create or replace view vw_proposiciones_por_grupo_y_subcategoria as
select
  gp.id_grupo,
  gp.nombre,
  gp.order,
  gp.color,
  sc_target.id_subcategoria,
  count(distinct case when vs.id_subcategoria = sc_target.id_subcategoria then p.id_votacion end) as total_proposiciones
from grupos_parlamentarios gp
cross join subcategorias sc_target
left join proponentes p on p.id_grupo = gp.id_grupo
left join votaciones_subcategorias vs on vs.id_votacion = p.id_votacion
group by gp.id_grupo, gp.nombre, gp.order, gp.color, sc_target.id_subcategoria;