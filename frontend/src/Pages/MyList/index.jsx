import React, { useEffect, useState } from "react";
import axios from "axios";
import Tmdb from "../../Tmdb.js";

import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext.jsx";

import MovieGrid from "../../components/MovieGrid";
import FiltersMyList from "../../components/FiltersMyList/index.jsx";

export default () => {
    const { user, setIsLoading } = useUserContext();
    const [myListDetails, setMyListDetails] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]); // array agora
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyList = async () => {
            if (user) {
                try {
                    setIsLoading(true);
                    const res = await axios.get("/my-list/all");

                    const detailsPromises = res.data.map(item =>
                        Tmdb.getMovieMyList(item.id_movie, item.type, item.status)
                            .then(details => {
                                if (details) {
                                    return { ...details, _id: item._id, status: item.status }; // adiciona status
                                }
                                return null;
                            })
                    );

                    const details = await Promise.all(detailsPromises);
                    setMyListDetails(details.filter(item => item !== null));
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchMyList();
    }, [user]);

    return (
        <div className="bg-[#111] min-h-screen">
            <h1 className="ml-[30px] pt-[70px] text-white text-2xl font-bold">Minha Lista</h1>

            <FiltersMyList 
                selectedStatuses={selectedStatuses} 
                setSelectedStatuses={setSelectedStatuses} 
            />

            <MovieGrid 
                moviesList={myListDetails.filter(item => 
                    selectedStatuses.length === 0 || selectedStatuses.includes(item.status)
                )} 
            />
        </div>
    )
}