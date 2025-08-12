import React from "react";
import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

export default ({ scrollRef, isHovered, showLeft, showRight }) => {
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
            {showLeft && (
                <button
                    onClick={handleScrollLeft}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-full w-[30px] cursor-pointer transform bg-neutral-800 text-white transition-opacity duration-300 ${isHovered ? "opacity-75" : "opacity-0"}`}
                >
                    <ChevronLeft fontSize="medium" className="text-white" />
                </button>
            )}

            {showRight && (
                <button
                    onClick={handleScrollRight}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 h-full w-[30px] cursor-pointer transform bg-neutral-800 text-white transition-opacity duration-300 ${isHovered ? "opacity-75" : "opacity-0"}`}
                >
                    <ChevronRight fontSize="medium" className="text-white" />
                </button>
            )}
        </div>
    );
};