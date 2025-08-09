import React, { useState, useEffect } from "react";
import Tmdb from "../../Tmdb.js";
import { Link } from "react-router-dom"
import FIlters from "../../components/FIlters/index.jsx";

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
            <h1 className="ml-[30px] pt-[50px] text-white text-3xl">Descobrir</h1>

            <FIlters type={type} setType={setType} selectedCetegories={selectedCetegories} setSelectedCategories={setSelectedCategories} />

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-[30px]">
                {moviesList.map((movie) => (
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
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};