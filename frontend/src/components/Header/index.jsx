import React from "react";
import { Link } from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExploreIcon from '@mui/icons-material/Explore';

export default () => {

    return (
        <header className="fixed top-0 left-0 right-0 px-6 py-2 flex justify-end gap-2 z-50">
            <Link to={"/"} className="text-white border p-1 rounded-full">
                <ArrowBackIcon fontSize="medium" className="text-white" />
            </Link>

            <Link to={"/search"} className="text-white border p-1 rounded-full">
                <SearchIcon fontSize="medium" className="text-white" />
            </Link>

            <Link to={"/discover"} className="text-white border p-1 rounded-full">
                <ExploreIcon fontSize="medium" className="text-white" />
            </Link>
        </header>
    )
}