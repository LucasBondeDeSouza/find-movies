import React from "react";
import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

export default ({ scrollRef, isHovered }) => {

    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
        }
    };

    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
    };

    return (
        <div>
            <button
                onClick={handleScrollLeft}
                className={`absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer transform bg-neutral-800 hover:bg-neutral-700 size-8 rounded-full text-white transition-opacity duration-300 ${isHovered ? "opacity-75" : "opacity-0"} hover:opacity-100`}
            >
                <ChevronLeft fontSize="medium" className="text-white" />
            </button>

            <button
                onClick={handleScrollRight}
                className={`absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer transform bg-neutral-800 hover:bg-neutral-700 size-8 rounded-full text-white transition-opacity duration-300 ${isHovered ? "opacity-75" : "opacity-0"} hover:opacity-100`}
            >
                <ChevronRight fontSize="medium" className="text-white" />
            </button>
        </div>
    )
}