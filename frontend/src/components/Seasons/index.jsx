import React from "react";

export default ({ seasons }) => {

    return (
        <>
            {seasons && (
                <div className="pl-[30px]">
                    <h2 className="text-white text-2xl font-bold">Temporadas</h2>

                    <div 
                        className="relative"
                    >
                        <div 
                            className="flex gap-3 overflow-x-auto scroll-auto hide-scrollbar py-5"
                        >
                            {seasons.map((season) => (
                                <div 
                                    key={season.id}
                                    className={`relative flex flex-col cursor-pointer transition-all duration-200 group`}
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
                    </div>
                </div>
            )}
        </>
    )
}