import React, { useState, useEffect } from "react";
import Tmdb from "../../Tmdb.js";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default ({ slug_db }) => {
    const [moviesList, setMoviesList] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState('');
    const [hoveredItemId, setHoveredItemId] = useState(null);

    useEffect(() => {
        const loadMovies = async () => {
            let list = await Tmdb.getHomeList();
            let category = list.find(i => i.slug === slug_db);
            if (category && category.items && category.items.results.length > 0) {
                setMoviesList(category.items.results);
                setCategoryTitle(category.title);
            }
        };

        loadMovies();
    }, []);

    return (
        <div>
            <h2 className="ml-[30px] text-white text-2xl font-bold">{categoryTitle}</h2>

            <div className="ml-[30px] flex gap-3 overflow-x-auto scroll-auto hide-scrollbar py-5">
                {moviesList.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col cursor-pointer hover:translate-y-[-10px] transition-all duration-200"
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
        </div>
    );
}