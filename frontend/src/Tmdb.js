const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
};

// Pega automaticamente todos os provedores brasileiros
const getAllBrazilProviders = async () => {
    const data = await basicFetch(`/watch/providers/movie?api_key=${API_KEY}&language=pt-BR&watch_region=BR`);
    if (data?.results) {
        return data.results.map(p => p.provider_id).join('|');
    }
    return '';
};

export default {
    getHomeList: async (type, movieId) => {
        const allProviders = await getAllBrazilProviders();

        return [
            {
                slug: 'trendings',
                title: 'Trendings',
                items: await basicFetch(`/trending/all/week?api_key=${API_KEY}&language=pt-BR&watch_region=BR`)
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
                items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}&language=pt-BR&watch_region=BR&with_watch_providers=${allProviders}`)
            },
            {
                slug: 'movieposter',
                title: 'Em Cartaz no Cinema',
                items: await basicFetch(`/movie/now_playing?api_key=${API_KEY}&language=pt-BR&watch_region=BR&with_watch_providers=${allProviders}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&watch_region=BR&with_genres=28&with_watch_providers=${allProviders}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&watch_region=BR&with_genres=35&with_watch_providers=${allProviders}`)
            },
            {
                slug: 'drama',
                title: 'Drama',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&watch_region=BR&with_genres=18&with_watch_providers=${allProviders}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&watch_region=BR&with_genres=27&with_watch_providers=${allProviders}`)
            },
            {
                slug: 'similars',
                title: 'Você também pode gostar',
                items: movieId
                    ? await basicFetch(`/${type}/${movieId}/recommendations?api_key=${API_KEY}&language=pt-BR`)
                    : { results: [] }
            }
        ];
    },

    getMovieInfo: async (movieId, type) => {
        if (!movieId || !type) return null;
        let info = {};

        info = await basicFetch(`/${type}/${movieId}?language=pt-BR&api_key=${API_KEY}`);

        const videos = await basicFetch(`/${type}/${movieId}/videos?api_key=${API_KEY}&language=pt-BR`);
        if (videos?.results?.length > 0) {
            const trailer = videos.results.find(
                video => video.type === 'Trailer' && video.site === 'YouTube'
            );
            if (trailer) {
                info.trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
            }
        }

        return info;
    },

    getMovieCast: async (movieId, type) => {
        if (!movieId || !type) return null;

        return await basicFetch(
            `/${type}/${movieId}/credits?api_key=${API_KEY}&language=pt-BR`
        )
    },

    getCategories: async (type) => {
        if (!type) return null;
        return await basicFetch(`/genre/${type}/list?api_key=${API_KEY}&language=pt-BR`);
    },

    getMovieFilter: async (type, categories) => {
        if (!type || categories.length === 0) return null;

        const allProviders = await getAllBrazilProviders();

        return await basicFetch(
            `/discover/${type}?api_key=${API_KEY}&language=pt-BR&with_genres=${categories.join(',')}&watch_region=BR&with_watch_providers=${allProviders}`
        );
    },

    getMovieSearch: async (query) => {
        if (!query || query.trim() === '') return { results: [] };

        const data = await basicFetch(
            `/search/multi?api_key=${API_KEY}&language=pt-BR&watch_region=BR&query=${encodeURIComponent(query)}`
        );

        if (data?.results) {
            data.results = data.results
                .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
                .map(item => ({
                    ...item,
                    type: item.media_type === 'movie' ? 'movie' : 'tv'
                }));
        }

        return data;
    },

    getMovieMyList: async (movieId, type, status) => {
        if (!movieId || !type) return null;

        const info = await basicFetch(`/${type}/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        info.type = type;
        info.status = status

        return info;
    }
};