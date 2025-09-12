import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useUserContext } from "../../contexts/UserContext.jsx";

import BookMarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookMarkAddedIcon from '@mui/icons-material/BookmarkAdded';

export default ({ id_movie, type }) => {
    const { user } = useUserContext();
    const [isInMyList, setIsInMyList] = useState(false);

    const checkMyList = async () => {
        if (user) {
            try {
                const res = await axios.get("/my-list", {
                    params: { id_movie, type }
                });

                setIsInMyList(res.data.added)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const handleAddToMyList = async (e) => {
        e.preventDefault();

        try {
            if (isInMyList) {
                await axios.delete("/my-list", { data: { id_movie, type } });
                setIsInMyList(false);
            } else {
                await axios.post("/my-list", { id_movie, type });
                setIsInMyList(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkMyList()
    }, [user, id_movie, type])

    return (
        <>
            {user ? (
                <div 
                    onClick={handleAddToMyList}
                    className={`w-[50px] h-[50px] flex items-center justify-center ${isInMyList ? "bg-green-600" : "bg-transparent ring-2"} hover:opacity-80 text-white rounded-full transition-all duration-300 cursor-pointer`} 
                    title={isInMyList ? "Remover da Minha lista" : "Adicionar à Minha lista"}
                >
                    {isInMyList ? <BookMarkAddedIcon /> : <BookMarkAddIcon />}
                </div>
            ) : (
                <Link 
                    to={"/login"}
                    className="w-[50px] h-[50px] flex items-center justify-center bg-transparent ring-2 hover:opacity-80 text-white rounded-full transition-all duration-300 cursor-pointer"
                    title="Adicionar à Minha lista"
                >
                    <BookMarkAddIcon />
                </Link>
            )}
        </>
    )
}