import React, { useState, useEffect, useRef } from "react";
import Tmdb from "../../Tmdb.js";
import ScrollButton from "../ScrollButton";

export default ({ slug_db }) => {
    const [moviesList, setMoviesList] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState('');
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        const loadMovies = async () => {
            let list = await Tmdb.getHomeList();
            let category = list.find(i => i.slug === slug_db);
            if (category?.items?.results?.length > 0) {
                setMoviesList(category.items.results);
                setCategoryTitle(category.title);
            }
        };

        loadMovies();
    }, []);

    const getItemMarginClass = (index, total) => {
        let classes = '';
        if (index === 0) classes += 'ml-[30px] ';
        if (index === total - 1) classes += 'mr-[30px]';
        return classes.trim();
    };

    return (
        <>
            <h2 className="ml-[30px] text-white text-2xl font-bold">{categoryTitle}</h2>

            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto scroll-auto hide-scrollbar pt-5"
                >
                    {moviesList.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex flex-col cursor-pointer hover:translate-y-[-10px] transition-all duration-200 ${getItemMarginClass(index, moviesList.length)}`}
                            onMouseEnter={() => setHoveredItemId(item.id)}
                            onMouseLeave={() => setHoveredItemId(null)}
                        >
                            <div
                                className="h-50 md:h-65 w-35 md:w-45 rounded-sm hover:rounded-b-none bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(https://image.tmdb.org/t/p/original${item.poster_path})`,
                                }}
                            ></div>

                            <div className={`bg-[#222] p-2 rounded-b-sm ${hoveredItemId === item.id ? 'opacity-100' : 'opacity-0'}`}>
                                <p className="text-white text-sm">{item.name || item.title}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <ScrollButton scrollRef={scrollRef} isHovered={isHovered} />
            </div>
        </>
    );
};