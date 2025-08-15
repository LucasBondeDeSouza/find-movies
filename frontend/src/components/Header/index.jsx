import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default () => {
    const [backgroundHeader, setBackgroundHeader] = useState(false)

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBackgroundHeader(true)
            } else {
                setBackgroundHeader(false)
            }
        }

        window.addEventListener('scroll', scrollListener)

        return () => {
            window.removeEventListener('scroll', scrollListener)
        }
    }, [])

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 px-[30px] py-2 flex items-center justify-between transition duration-500 ${backgroundHeader && 'bg-black/50 backdrop-blur-md border-b border-white/10 shadow-lg'}`}>

            <Link to={"/"}>
                <h1 className="text-2xl font-bold text-red-600 tracking-wide">
                    Find 
                    <span className="text-blue-600">Movie</span>
                </h1>
            </Link>

            <div className="flex gap-3">
                <Link to={"/search"} title={"Buscar"} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                    <SearchIcon fontSize="medium" className="text-white" />
                </Link>

                <Link to={"/discover"} title={"Descobrir"} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                    <FilterAltIcon fontSize="medium" className="text-white" />
                </Link>
            </div>
        </header>
    )
}