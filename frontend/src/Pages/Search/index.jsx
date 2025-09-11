import React, { useState, useEffect } from "react"

import { useUserContext } from "../../contexts/UserContext";
import Tmdb from "../../Tmdb"
import MovieGrid from "../../components/MovieGrid";

export default () => {
    const { setIsLoading } = useUserContext();
    const [search, setSearch] = useState('')
    const [moviesList, setMoviesList] = useState([])

    useEffect(() => {
        const loadMovies = async () => {
            setIsLoading(true)
            const items = await Tmdb.getMovieSearch(search)
            setIsLoading(false)
            setMoviesList(items.results)
        }

        loadMovies()
    }, [search])

    console.log(moviesList)

    return (
        <div className="bg-[#111] min-h-screen">
            <h1 className="ml-[30px] pt-[70px] text-white text-2xl font-bold">Pesquisar</h1>

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