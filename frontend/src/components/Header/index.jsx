import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from "@mui/icons-material/Person"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";

export default () => {
    const { user, setUser } = useUserContext()
    const [backgroundHeader, setBackgroundHeader] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate()

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

    // Fecha dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const logout = async () => {
        try {
            await axios.post("/users/logout")
            setUser(null)
            navigate("/")
        } catch (error) {
            toast.error(JSON.stringify(error), {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            })
        }
    }

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 px-[30px] py-2 flex items-center justify-between transition duration-500 ${backgroundHeader && 'bg-black/50 backdrop-blur-md border-b border-white/10 shadow-lg'}`}>

            <Link to={"/"}>
                <h1 className="text-2xl font-bold text-red-600 tracking-wide">
                    Find 
                    <span className="text-blue-600">Movies</span>
                </h1>
            </Link>

            <div className="flex gap-3">
                <Link to={"/search"} title={"Buscar"} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                    <SearchIcon fontSize="medium" className="text-white" />
                </Link>

                <Link to={"/discover"} title={"Descobrir"} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                    <FilterAltIcon fontSize="medium" className="text-white" />
                </Link>

                <Link to={user ? "/my-list" : "/login"} title={"Minha Lista"} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                    <BookmarkIcon fontSize="medium" className="text-white" />
                </Link>

                {user && (
                    <div 
                        className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white cursor-pointer" 
                        ref={menuRef}
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <PersonIcon fontSize="medium" className="text-white" />
                        <ArrowDropDownIcon fontSize="small" />

                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden">
                                <div className="block w-full text-left px-4 py-2 text-sm">
                                    <span className="text-white truncate">{user.name}</span>
                                </div>
                                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-zinc-800 cursor-pointer">
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}