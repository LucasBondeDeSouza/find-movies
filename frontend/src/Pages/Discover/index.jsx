import React, { useState, useEffect } from "react";

import { useUserContext } from "../../contexts/UserContext.jsx";
import Tmdb from "../../Tmdb.js";
import Filters from "../../components/FIlters/index.jsx";
import MovieGrid from "../../components/MovieGrid/index.jsx";

export default () => {
    const { setIsLoading } = useUserContext();
    const [type, setType] = useState('movie')
    const [selectedCetegories, setSelectedCategories] = useState([]);
    const [moviesList, setMoviesList] = useState([])

    useEffect(() => {
        const loadMovies = async () => {
            setIsLoading(true)
            const items = await Tmdb.getMovieFilter(type, selectedCetegories)
            setIsLoading(false)
            setMoviesList(items.results)
        }

        loadMovies()

    }, [selectedCetegories])

    return (
        <div className="bg-[#111] min-h-screen">
            <h1 className="ml-[30px] pt-[70px] text-white text-2xl font-bold">Descobrir</h1>

            <Filters type={type} setType={setType} selectedCetegories={selectedCetegories} setSelectedCategories={setSelectedCategories} />

            <MovieGrid 
                moviesList={moviesList} 
                selectedCategories={selectedCetegories} 
                type={type}
                showEmptyState={true}
            />
        </div>
    );
};