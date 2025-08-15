import React, { useState, useEffect } from "react"
import Tmdb from "../../Tmdb"
import { Link } from "react-router-dom"
import StarIcon from '@mui/icons-material/Star';
import MovieGrid from "../../components/MovieGrid";

export default () => {
    const [search, setSearch] = useState('')
    const [moviesList, setMoviesList] = useState([])

    useEffect(() => {
        const loadMovies = async () => {
            const items = await Tmdb.getMovieSearch(search)
            setMoviesList(items.results)
        }

        loadMovies()
    }, [search])

    console.log(moviesList)

    return (
        <div className="bg-[#111] min-h-screen">
            <h1 className="ml-[30px] pt-[60px] text-white text-2xl font-bold">Pesquisar</h1>

            <div className="mx-[30px] mt-6">
                <input 
                    type="text"
                    className="w-full border border-white text-white rounded-full outline-none py-2 px-5 text-xl"
                    placeholder="Digite o nome do filme ou série"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <MovieGrid moviesList={moviesList} />
        </div>
    )
}