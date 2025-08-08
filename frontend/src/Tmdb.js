const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE = 'https://api.themoviedb.org/3'


const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`)
    const json = await req.json()
    return json
}

export default {
    getHomeList: async (type, movieId) => {
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
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}&language=pt-BR&watch_region=BR`)
            },
            {
                slug: 'movieposter',
                title: 'Em Cartaz no Cinema',
                items: await basicFetch(`/movie/now_playing?api_key=${API_KEY}&language=pt-BR`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&watch_region=BR&with_genres=28&sort_by=popularity.desc`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&watch_region=BR&with_genres=35&sort_by=popularity.desc`)
            },
            {
                slug: 'drama',
                title: 'Drama',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&watch_region=BR&with_genres=18&sort_by=popularity.desc`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&watch_region=BR&with_genres=27&sort_by=popularity.desc`)
            },
            {
                slug: 'similars',
                title: 'Você também pode gostar',
                items: await basicFetch(`/${type}/${movieId}/recommendations?language=pt-BR&api_key=${API_KEY}`)
            }
        ]
    },

    getMovieInfo: async (movieId, type) => {
        let info = {};

        if (movieId) {
            // Busca os dados principais do filme/série
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                default:
                    info = null;
                    break;
            }

            // Busca os vídeos (trailers etc.)
            const videos = await basicFetch(`/${type}/${movieId}/videos?api_key=${API_KEY}&language=pt-BR`);

            // Filtra o trailer do YouTube (opcional: pode ajustar para pegar teaser, etc.)
            if (videos?.results?.length > 0) {
                const trailer = videos.results.find(
                    video => video.type === 'Trailer' && video.site === 'YouTube'
                );

                if (trailer) {
                    info.trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
                }
            }
        }

        return info;
    },

    getCategories: async (type) => {
        let items = {}

        if (type) {
            items = await basicFetch(`/genre/${type}/list?api_key=${API_KEY}&language=pt-BR`)
        } else {
            items = null
        }

        return items
    }
}