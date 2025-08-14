import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Tmdb from "../../Tmdb.js"

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MovieInfoIcon from '@mui/icons-material/Movie';
import Trendings from "../../components/Trendings/index.jsx";
import Seasons from "../../components/Seasons/index.jsx";

export default () => {
    const { id, type } = useParams()
    const [item, setItem] = useState(null)

    useEffect(() => {
        const loadInfo = async () => {
            if (id && type) {
                const info = await Tmdb.getMovieInfo(id, type);
                setItem(info);
            }
        };

        loadInfo();
    }, [id, type]);

    return (
        <div className="bg-[#111]">
            {item && (
                <>
                    <div 
                        className="h-[90vh] md:h-screen bg-cover bg-center"
                        style={{
                            backgroundImage: item ? `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` : 'none'
                        }}
                    >
                        <div className="gradient bg-gradient-to-b to-[#111] from-transparent inherit">
                            <div className="flex flex-col justify-center gap-[15px] pl-8 pb-36 pt-18 gradient bg-gradient-to-l to-[#111] from-transparent transition-all duration-900 inherit">
                                <p className="text-[40px] md:text-[60px] font-bold text-white">
                                    {item.name || item.title}
                                </p>

                                <div className="flex gap-[15px]">
                                    <p className="text-[16px] md:text-[18px] font-bold text-green-500">{item.vote_average.toFixed(1)} pontos</p>
                                    <p className="text-[16px] md:text-[18px] font-bold text-white">{item.first_air_date?.substring(0, 4) || item.release_date?.substring(0, 4)}</p>
                                    <p className="text-[16px] md:text-[18px] font-bold text-white">{item.number_of_seasons && item.number_of_seasons + ' temporada(s)'}</p>
                                </div>

                                <p className="text-[14px] md:text-[20px] text-gray-400 max-w-[100%] md:max-w-[60%] mr-[30px]">
                                    {item.overview.length > 350 ? item.overview.slice(0, 350) + '...' : item.overview}
                                </p>

                                <div className="flex gap-2">
                                    {item.homepage && (
                                        <a
                                            href={item.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 bg-white hover:opacity-70 text-black text-[16px] md:text-[20px] font-bold py-[10px] px-[20px] rounded-[5px] transition-all duration-300"
                                        >
                                            <PlayArrowIcon />
                                            Assistir
                                        </a>
                                    )}

                                    {item.trailerUrl && (
                                        <a
                                            href={item.trailerUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-[50px] h-[50px] flex items-center justify-center bg-red-600 hover:opacity-80 text-white rounded-full transition-all duration-300"
                                        >
                                            <MovieInfoIcon fontSize="medium" />
                                        </a>
                                    )}
                                </div>

                                <p className="text-[14px] md:text-[18px] text-gray-400">
                                    <strong>Gêneros:</strong> {item.genres?.map(g => g.name).join(', ')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-transparent translate-y-[-60px] lg:translate-y-[-80px]">
                        <Seasons seasons={item.seasons} />

                        <Trendings slug_db={"similars"} type={type} movieId={item.id} />
                    </div>
                </>
            )}
        </div>
    )
}