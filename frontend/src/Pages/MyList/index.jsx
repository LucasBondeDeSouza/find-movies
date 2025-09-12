import React, { useEffect, useState } from "react";
import axios from "axios"
import Tmdb from "../../Tmdb.js";

import { useUserContext } from "../../contexts/UserContext.jsx";

import MovieGrid from "../../components/MovieGrid"

export default () => {
    const { user, setIsLoading } = useUserContext();
    const [myList, setMyList] = useState([]);
    const [myListDetails, setMyListDetails] = useState([]);

    useEffect(() => {
        const fetchMyList = async () => {
            if (user) {
                try {
                    setIsLoading(true);
                    const res = await axios.get("/my-list/all")
                    setMyList(res.data)

                    const detailsPromises = res.data.map(item =>
                        Tmdb.getMovieMyList(item.id_movie, item.type, item.status)
                            .then(details => {
                            if (details) {
                                return { ...details, _id: item._id }; // adiciona o _id do banco
                            }
                            return null;
                            })
                    );

                    const details = await Promise.all(detailsPromises);
                    setMyListDetails(details.filter(item => item !== null));
                    
                    setIsLoading(false);
                } catch (error) {
                    console.error(error)
                }
            }
        }

        fetchMyList()
    }, [user])

    return (
        <div className="bg-[#111] min-h-screen">
            <div className="py-10"></div>

            <MovieGrid moviesList={myListDetails} />
        </div>
    )
}