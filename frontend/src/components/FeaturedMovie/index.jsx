import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({ item }) => {

    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    let description = item.overview;
    if (description.length > 150) {
        description = description.substring(0, 150) + '...';
    }

    let firstDate = new Date(item.first_air_date);

    return (
        <div 
            className="h-[90vh] md:h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
            }}
        >
            <div className="gradient bg-gradient-to-b to-[#111] from-transparent" style={{ width: "inherit", height: "inherit" }}>
                <div className="flex flex-col justify-center gap-[15px] pl-8 pb-36 pt-18 gradient bg-gradient-to-l to-[#111] from-transparent" style={{ width: "inherit", height: "inherit" }}>
                    <p className="text-[40px] md:text-[60px] font-bold text-white">
                        {item.name}
                    </p>

                    <div className="flex gap-[15px]">
                        <p className="text-[16px] md:text-[18px] font-bold text-green-500">{item.vote_average} pontos</p>
                        <p className="text-[16px] md:text-[18px] font-bold text-white">{firstDate.getFullYear()}</p>
                        <p className="text-[16px] md:text-[18px] font-bold text-white">{item.number_of_seasons} temporada{item.number_of_seasons != 1 ? 's' : ''}</p>
                    </div>

                    <p className="text-[14px] md:text-[20px] text-gray-400 max-w-[100%] md:max-w-[40%] mr-[30px]">
                        {description}
                    </p>

                    <div className="flex">
                        <a 
                            href="/" 
                            className="bg-white hover:opacity-70 text-[16px] md:text-[20px] font-bold py-[12px] px-[25px] rounded-[5px] opacity-[1] transition-all duration-300">+ Minha Lista
                        </a>
                    </div>

                    <p className="text-[14px] md:text-[18px] text-gray-400"><strong>Gêneros:</strong> {genres.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}