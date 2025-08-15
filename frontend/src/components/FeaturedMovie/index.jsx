import React, { useState, useEffect } from "react";
import InfoIcon from '@mui/icons-material/Info';
import Tmdb from "../../Tmdb.js";
import { Link } from "react-router-dom";

export default () => {
    const [trendingsList, setTrendingsList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0); // Novo estado para controlar o índice

    useEffect(() => {
        const loadTrendings = async () => {
            const list = await Tmdb.getHomeList();
            const trendings = list.find(i => i.slug === 'trendings');
            if (trendings && trendings.items?.results?.length > 0) {
                setTrendingsList(trendings.items.results);
            }
        };
        loadTrendings();
    }, []);

    // Exibe o próximo filme a cada 10 segundos, em ordem
    useEffect(() => {
        if (trendingsList.length === 0) return;

        const loadMovie = async () => {
            const current = trendingsList[currentIndex];
            const info = await Tmdb.getMovieInfo(current.id, current.media_type);
            
            setFeaturedData({ 
                ...info, 
                media_type: current.media_type 
            });
        };

        loadMovie();

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % trendingsList.length);
        }, 15000);

        return () => clearInterval(interval);
    }, [trendingsList, currentIndex]);

    if (!featuredData) return null;

    return (
        <div 
            className="h-[90vh] md:h-screen bg-cover bg-center transition-all duration-900"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredData.backdrop_path})`,
            }}
        >
            <div className="gradient bg-gradient-to-b to-[#111] from-transparent inherit">
                <div className="flex flex-col justify-center gap-[15px] pl-8 pb-36 pt-18 gradient bg-gradient-to-l to-[#111] from-transparent transition-all duration-900 inherit">
                    <p className="text-[40px] md:text-[60px] font-bold text-white">
                        {featuredData.name || featuredData.title}
                    </p>

                    <div className="flex gap-[15px]">
                        <p className="text-[16px] md:text-[18px] font-bold text-green-500">{featuredData.vote_average.toFixed(1)} pontos</p>
                        <p className="text-[16px] md:text-[18px] font-bold text-white">{featuredData.first_air_date?.substring(0, 4) || featuredData.release_date?.substring(0, 4)}</p>
                        <p className="text-[16px] md:text-[18px] font-bold text-white">{featuredData.number_of_seasons && featuredData.number_of_seasons + ' temporada(s)'}</p>
                    </div>

                    <p className="text-[14px] md:text-[20px] text-gray-400 max-w-[100%] md:max-w-[40%] mr-[30px]">
                        {featuredData.overview.length > 150 ? featuredData.overview.substring(0, 150) + '...' : featuredData.overview}
                    </p>

                    <div className="flex">
                        <Link 
                            to={`/detail/${featuredData.media_type}/${featuredData.id}`} 
                            title="Detalhes"
                            className="flex items-center justify-center gap-2 bg-white hover:opacity-70 text-black text-[16px] md:text-[20px] font-bold py-[10px] px-[20px] rounded-[5px] transition-all duration-300">
                                <InfoIcon />
                                Detalhes
                        </Link>
                    </div>

                    <p className="text-[14px] md:text-[18px] text-gray-400">
                        <strong>Gêneros:</strong> {featuredData.genres?.map(g => g.name).join(', ')}
                    </p>
                </div>
            </div>
        </div>
    );
};