import React, { useState, useEffect } from "react";
import Tmdb from "../../Tmdb.js";

export default () => {
    const [trendingsList, setTrendingsList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);

    // Carrega a lista de originais apenas uma vez
    useEffect(() => {
        const loadTrendings = async () => {
            let list = await Tmdb.getHomeList();
            let trendings = list.find(i => i.slug === 'trendings');
            if (trendings && trendings.items && trendings.items.results.length > 0) {
                setTrendingsList(trendings.items.results);
            }
        };
        loadTrendings();
    }, []);

    // Troca o filme a cada 15 segundos
    useEffect(() => {
        if (trendingsList.length === 0) return;

        const pickRandomFeatured = async () => {
            let randomIndex = Math.floor(Math.random() * trendingsList.length);
            let chosen = trendingsList[randomIndex];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, chosen.media_type);
            setFeaturedData(chosenInfo);
        };

        // Primeiro carregamento
        pickRandomFeatured();

        // Intervalo para mudar a cada 10 segundos
        const interval = setInterval(pickRandomFeatured, 10000);

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }, [trendingsList]);

    if (!featuredData) return null;

    console.log(featuredData)

    return (
        <div 
            className="h-[90vh] md:h-screen bg-cover bg-center transition-all duration-900"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredData.backdrop_path})`,
            }}
        >
            <div className="gradient bg-gradient-to-b to-[#111] from-transparent" style={{ width: "inherit", height: "inherit" }}>
                <div className="flex flex-col justify-center gap-[15px] pl-8 pb-36 pt-18 gradient bg-gradient-to-l to-[#111] from-transparent transition-all duration-900" style={{ width: "inherit", height: "inherit" }}>
                    <p className="text-[40px] md:text-[60px] font-bold text-white">
                        {featuredData.name || featuredData.title}
                    </p>

                    <div className="flex gap-[15px]">
                        <p className="text-[16px] md:text-[18px] font-bold text-green-500">{featuredData.vote_average} pontos</p>
                        <p className="text-[16px] md:text-[18px] font-bold text-white">{featuredData.first_air_date?.substring(0, 4) || featuredData.release_date?.substring(0, 4)}</p>
                        <p className="text-[16px] md:text-[18px] font-bold text-white">{featuredData.number_of_seasons && featuredData.number_of_seasons + ' temporada(s)'}</p>
                    </div>

                    <p className="text-[14px] md:text-[20px] text-gray-400 max-w-[100%] md:max-w-[40%] mr-[30px]">
                        {featuredData.overview.length > 150 ? featuredData.overview.substring(0, 150) + '...' : featuredData.overview}
                    </p>

                    <div className="flex">
                        <a 
                            href="/" 
                            className="bg-white hover:opacity-70 text-[16px] md:text-[20px] font-bold py-[12px] px-[25px] rounded-[5px] opacity-[1] transition-all duration-300">+ Minha Lista
                        </a>
                    </div>

                    <p className="text-[14px] md:text-[18px] text-gray-400">
                        <strong>Gêneros:</strong> {featuredData.genres?.map(g => g.name).join(', ')}
                    </p>
                </div>
            </div>
        </div>
    );
};