import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getVotaciones = cache(async (supabase: SupabaseClient) => {
    const { data: votaciones, error } = await supabase
        .from('votaciones')
        .select('*, sesiones(fecha)');
    if (error) {
        console.error(error);
        throw new Error('Error fetching votaciones');
    } else {
        const sortedData = (votaciones || []).sort((a, b) => {
            const dateA = new Date(a.sesiones.fecha);
            const dateB = new Date(b.sesiones.fecha);
            return dateB.getTime() - dateA.getTime();
        });
        return votaciones;
    } 
});

export const getVotacion = cache(async (supabase: SupabaseClient, id: string) => {
    const { data: votacion, error } = await supabase
    .from('votaciones')
    .select(`
        titulo,
        texto_expediente,
        presentes,
        a_favor,
        en_contra,
        abstenciones,
        no_votan,
        votos (
            id_voto,
            id_votacion,
            asiento,
            voto,
            diputados(
                id_diputado,
                nombre,
                grupos_parlamentarios(
                    id_grupo,
                    nombre
                )
            )
        ),
        votaciones_subcategorias(
            id_subcategoria,
            subcategorias(
                nombre_subcategoria
            )
        ),
        proponentes(
            grupos_parlamentarios(
                id_grupo,
                nombre
            )
        )
    `)
    .eq('id_votacion', id)
    .single(); // Use .single() to get a single object instead of an array
    
    if (error) {
        console.error(error);
        throw new Error('Error fetching votaciones');
    }
    
    return votacion;
});

export const getDiputado = cache(async (supabase: SupabaseClient, id: string) => {
    const { data: diputados, error } = await supabase.from('diputados')
    .select(`
      id_diputado, 
      nombre, 
      id_grupo,
      grupos_parlamentarios(nombre, id_grupo),
      votos(
        asiento, 
        voto, 
        votaciones(
          titulo, 
          id_votacion, 
          id_sesion,
          sesiones(fecha)
        )
      )
    `)
    .eq('id_diputado', id)
    .single();
    
    if (error) {
        console.error(error);
        throw new Error('Error fetching diputados');
    }
    
    return diputados;
});

export const getGrupoParlamentario = cache(async (supabase: SupabaseClient, id: string) => {
    const { data: grupo_parlamentario, error } = await supabase
    .from("grupos_parlamentarios")
    .select(`
      id_grupo,
      nombre,
      color,
      diputados(
        id_diputado,
        nombre
      )
    `)
    .eq("id_grupo", id)
    .single();
    
    if (error) {
        console.error(error);
        throw new Error('Error fetching grupos parlamentarios');
    }
    
    return grupo_parlamentario;
});

export const getVotosPorGrupo = cache(async (supabase: SupabaseClient) => {
    const { data: grupos, error } = await supabase.rpc('votos_por_grupo');
    
    if (error) {
        console.error(error);
        throw new Error('Error fetching votos por grupo');
    }
    
    return grupos;
});

export const getVotosPorDiputado = cache(async (supabase: SupabaseClient) => {
    const { data: diputados, error } = await supabase.rpc('votos_por_diputado');
    
    if (error) {
        console.error(error);
        throw new Error('Error fetching votos por diputado');
    }
    
    return diputados;
});

export const getVotacionesSubcategoria = cache(async (supabase: SupabaseClient, subcategoriaId: string) => {
    const { data: subcategoria, error } = await supabase
        .from('subcategorias')
        .select(`
            id_subcategoria,
            nombre_subcategoria,
            categorias(
                id_categoria,
                nombre_categoria
            ),
            votaciones_subcategorias(
                votaciones(
                    id_votacion,
                    titulo,
                    texto_expediente,
                    sesiones(fecha)
                )
            )
        `)
        .eq('id_subcategoria', subcategoriaId)
        .single(); // Use .single() to get a single object instead of an array

    if (error) {
        console.error(error);
        throw new Error('Error fetching votaciones for subcategoria');
    }

    // Sort votaciones by fecha descending
    if (subcategoria && subcategoria.votaciones_subcategorias) {
        subcategoria.votaciones_subcategorias = subcategoria.votaciones_subcategorias.sort((a, b) => {
            const dateA = new Date(a.votaciones[0]?.sesiones[0]?.fecha);
            const dateB = new Date(b.votaciones[0]?.sesiones[0]?.fecha);
            return dateB.getTime() - dateA.getTime();
        });
    }

    return subcategoria;
});

export const getSubcategorias = cache(async (supabase: SupabaseClient) => {
    const { data: subcategorias, error } = await supabase
        .from('subcategorias')
        .select(`
            id_subcategoria,
            nombre_subcategoria,
            categorias(
                id_categoria,
                nombre_categoria
            ),
            votaciones_subcategorias(
                id_votacion
            )
        `)

    if (error) {
        console.error(error);
        throw new Error('Error fetching subcategorias');
    }

    return subcategorias;
});