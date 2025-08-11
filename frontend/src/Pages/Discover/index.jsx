import React, { useState, useEffect } from "react";
import Tmdb from "../../Tmdb.js";
import { Link } from "react-router-dom"
import FIlters from "../../components/FIlters/index.jsx";
import StarIcon from '@mui/icons-material/Star';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default () => {
    const [type, setType] = useState('movie')
    const [selectedCetegories, setSelectedCategories] = useState([]);
    const [moviesList, setMoviesList] = useState([])

    useEffect(() => {
        const loadMovies = async () => {
            const items = await Tmdb.getMovieFilter(type, selectedCetegories)
            setMoviesList(items.results)
        }

        loadMovies()

    }, [selectedCetegories])

    return (
        <div className="bg-[#111] min-h-screen">
            <h1 className="ml-[30px] pt-[50px] text-white text-2xl font-bold">Descobrir</h1>

            <FIlters type={type} setType={setType} selectedCetegories={selectedCetegories} setSelectedCategories={setSelectedCategories} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-[30px]">
                {selectedCetegories.length > 0 ? (
                    moviesList.length > 0 ? (
                        moviesList.map((movie) => (
                            <Link 
                                to={`/detail/${type}/${movie.id}`}
                                key={movie.id}
                                className="flex flex-col"
                            >
                                <div 
                                    className="aspect-[16/9] rounded-sm bg-cover bg-center"
                                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
                                ></div>

                                <div className="flex flex-col">
                                    <p className="text-white font-bold">{movie.name || movie.title}</p>
                                    <p className="text-yellow-400 text-xs font-semibold flex items-center gap-1">
                                        <StarIcon fontSize="inherit" /> {movie.vote_average.toFixed(1)}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                            <SearchOffIcon fontSize="large" className="text-gray-500 mb-4" />

                            <p className="text-gray-400 text-lg font-medium">
                                Nenhum resultado encontrado
                            </p>

                            <p className="text-gray-500 text-sm mt-1">
                                Tente ajustar os filtros para encontrar mais opções
                            </p>
                        </div>
                    )
                ) : null}
            </div>
        </div>
    );
};