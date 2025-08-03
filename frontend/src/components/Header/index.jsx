import React from "react";
import SearchIcon from '@mui/icons-material/Search';

export default () => {

    return (
        <header className="fixed top-0 left-0 right-0 px-6 py-2 flex justify-end gap-2 z-50">
            <div className="text-white border p-1 rounded-full">
                <SearchIcon fontSize="medium" className="text-white" />
            </div>

            <div className="text-white border p-1 rounded-full">
                <SearchIcon fontSize="medium" className="text-white" />
            </div>
        </header>
    )
}