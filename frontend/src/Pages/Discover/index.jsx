import React, { useState, useEffect } from "react";
import Tmdb from "../../Tmdb.js";
import { Link } from "react-router-dom"
import FIlters from "../../components/FIlters/index.jsx";
import StarIcon from '@mui/icons-material/Star';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import MovieGrid from "../../components/MovieGrid/index.jsx";

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
            <h1 className="ml-[30px] pt-[70px] text-white text-2xl font-bold">Descobrir</h1>

            <FIlters type={type} setType={setType} selectedCetegories={selectedCetegories} setSelectedCategories={setSelectedCategories} />

            <MovieGrid 
                moviesList={moviesList} 
                selectedCategories={selectedCetegories} 
                type={type}
                showEmptyState={true}
            />
        </div>
    );
};