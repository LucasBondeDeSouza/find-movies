import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MovieComponent({ api }) {
    const [listMovie, setListMovie] = useState([]);
    const [index, setIndex] = useState(null);

    useEffect(() => {
        const axiosGet = async () => {
            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api}`);
                setListMovie(data.results);
                
                if (data.results.length > 0) {
                    const random = Math.floor(Math.random() * data.results.length);
                    setIndex(random);
                }
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
            }
        };

        axiosGet();
    }, []);

    const randomIndex = () => {
        if (listMovie.length > 0) {
            const random = Math.floor(Math.random() * listMovie.length);
            setIndex(random);
        }
    };

    const currentMovie = listMovie[index];

    return (
        <div>
            {currentMovie && (
                <>
                    <p>{currentMovie.original_title}</p>
                    <img
                        src={`https://image.tmdb.org/t/p/w780${currentMovie.poster_path}`}
                        alt={currentMovie.original_title}
                        style={{ width: "300px", borderRadius: "10px" }}
                    />
                </>
            )}
        </div>
    );
}