const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE = 'https://api.themoviedb.org/3'

/* 
- Originais da Netflix
- Recomendados (trending)
- Em alta (top rated)
- Ação
- Comédia
- Terror
- Romance
- Documentários
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`)
    const json = await req.json()
    return json
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'trendings',
                title: 'Trendings',
                items: await basicFetch(`/trending/all/week?api_key=${API_KEY}&language=pt-BR`)
            },
            {
                slug: 'serie_netflix',
                title: 'Séries Originais Netflix',
                items: await basicFetch(`/discover/tv?api_key=${API_KEY}&language=pt-BR&with_watch_providers=8&watch_region=BR`)
            },
            {
                slug: 'filme_netflix',
                title: 'Filmes Originais Netflix',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&with_watch_providers=8&watch_region=BR`)
            }
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {}

        if(movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                default:
                    info = null
                break;
            }
        }

        return info
    }
}