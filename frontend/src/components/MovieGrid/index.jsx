import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default ({ 
    moviesList = [], 
    selectedCategories = null, 
    type = null, 
    showEmptyState = false
}) => {

    const shouldRender = selectedCategories === null || selectedCategories.length > 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-[30px] py-6">
            {shouldRender ? (
                moviesList.length > 0 ? (
                    moviesList.map((movie) => (
                        <Link
                            to={`/detail/${type || movie.type}/${movie.id}`}
                            key={movie.id}
                            className="flex flex-col"
                        >
                            <div
                                className='aspect-[16/9] rounded-sm bg-cover bg-center hover:border border-white'
                                style={{
                                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                                }}
                            ></div>

                            <div className="flex flex-col">
                                <p className="text-white font-bold">
                                    {movie.name || movie.title}
                                </p>
                                <p className="text-yellow-400 text-xs font-semibold flex items-center gap-1">
                                    <StarIcon fontSize="inherit" /> {movie.vote_average.toFixed(1)}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : showEmptyState ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                        <SearchOffIcon
                            fontSize="large"
                            className="text-gray-500 mb-4"
                        />

                        <p className="text-gray-400 text-lg font-medium">
                            Nenhum resultado encontrado
                        </p>

                        <p className="text-gray-500 text-sm mt-1">
                            Tente ajustar os filtros para encontrar mais opções
                        </p>
                    </div>
                ) : null
            ) : null}
        </div>
    )
}