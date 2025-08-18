import React, { useState, useEffect, useRef } from "react";

import { useGlobalState } from "../../contexts/StateContext";
import Tmdb from "../../Tmdb.js";
import { Link } from "react-router-dom";
import ScrollButton from "../ScrollButton";
import StarIcon from '@mui/icons-material/Star';

export default ({ slug_db, type, movieId }) => {
    const { setIsLoading } = useGlobalState();
    const [moviesList, setMoviesList] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState('');
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    // novos estados para controlar visibilidade dos botões
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const scrollRef = useRef(null);

    useEffect(() => {
        const loadMovies = async () => {
            setIsLoading(true)
            let list = await Tmdb.getHomeList(type, movieId);
            setIsLoading(false)
            let category = list.find(i => i.slug === slug_db);
            if (category?.items?.results?.length > 0) {
                setMoviesList(category.items.results);
                setCategoryTitle(category.title);
            }
        };
        loadMovies();
    }, [movieId]);

    // função que verifica se tem scroll disponível
    const checkScrollButtons = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft + clientWidth < scrollWidth - 1); // -1 evita bug de arredondamento
    };

    useEffect(() => {
        checkScrollButtons();
    }, [moviesList]);

    const getItemMarginClass = (index, total) => {
        let classes = '';
        if (index === 0) classes += 'ml-[30px] ';
        if (index === total - 1) classes += 'mr-[30px]';
        return classes.trim();
    };

    return (
        <div className="py-3">
            <h2 className="ml-[30px] text-white text-2xl font-bold">{categoryTitle}</h2>

            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    ref={scrollRef}
                    onScroll={checkScrollButtons} // escuta rolagem
                    className="flex gap-3 overflow-x-auto scroll-auto hide-scrollbar mt-5"
                >
                    {moviesList.map((item, index) => (
                        <Link
                            to={`/detail/${type}/${item.id}`}
                            key={item.id}
                            className={`relative flex flex-col cursor-pointer transition-all duration-200 ${getItemMarginClass(index, moviesList.length)} group`}
                            onMouseEnter={() => setHoveredItemId(item.id)}
                            onMouseLeave={() => setHoveredItemId(null)}
                        >
                            <div
                                className={`h-50 md:h-65 w-35 md:w-45 group-hover:w-60 md:group-hover:w-100 rounded-sm bg-cover bg-center transition-all duration-500`}
                                style={{
                                    backgroundImage: `url(https://image.tmdb.org/t/p/original${
                                        hoveredItemId === item.id ? item.backdrop_path : item.poster_path
                                    })`,
                                }}
                            ></div>

                            <div
                                className={`absolute bottom-2 left-2 mr-2 z-10 bg-black bg-opacity-60 px-2 py-1 rounded transition-opacity duration-300 ${
                                    hoveredItemId === item.id ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <p className="text-white text-sm font-medium">
                                    {item.name || item.title}
                                </p>
                                <p className="text-yellow-400 text-xs font-semibold flex items-center gap-1">
                                    <StarIcon fontSize="inherit" /> {item.vote_average.toFixed(1)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <ScrollButton
                    scrollRef={scrollRef}
                    isHovered={isHovered}
                    showLeft={showLeft}
                    showRight={showRight}
                />
            </div>
        </div>
    );
};