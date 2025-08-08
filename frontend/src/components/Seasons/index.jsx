import React, { useRef, useState } from "react";

import ScrollButton from "../ScrollButton";

export default ({ seasons }) => {
    const [isHovered, setIsHovered] = useState(false);
    const scrollRef = useRef(null);

    const getItemMarginClass = (index, total) => {
        let classes = '';
        if (index === 0) classes += 'ml-[30px] ';
        if (index === total - 1) classes += 'mr-[30px]';
        return classes.trim();
    };

    return (
        <>
            {seasons && (
                <div>
                    <h2 className="ml-[30px] text-white text-2xl font-bold">Temporadas</h2>

                    <div 
                        className="relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div 
                            ref={scrollRef}
                            className="flex gap-3 overflow-x-auto scroll-auto hide-scrollbar py-5"
                        >
                            {seasons.map((season, index) => (
                                <div 
                                    key={season.id}
                                    className={`relative flex flex-col cursor-pointer transition-all duration-200 ${getItemMarginClass(index, seasons.length)}`}
                                >
                                    <div 
                                        className="h-75 w-50 rounded-sm bg-cover bg-center transition-all duration-500"
                                        style={{
                                            backgroundImage: `url(https://image.tmdb.org/t/p/original${season.poster_path})`
                                        }}
                                    ></div>

                                    <div className="flex flex-col w-50">
                                        <p className="font-bold text-white">{season.name}</p>

                                        <div className="flex gap-2 text-gray-300 text-xs font-medium">
                                            <span>{season.air_date?.substring(0, 4)}</span>
                                            <span>•</span>
                                            <span>{season.episode_count} episódios</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <ScrollButton scrollRef={scrollRef} isHovered={isHovered} />
                    </div>
                </div>
            )}
        </>
    )
}