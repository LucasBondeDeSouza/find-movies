import React, { useEffect, useRef } from "react";

export default ({ setShowTrailer, trailer }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowTrailer(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowTrailer]);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div
                ref={modalRef}
                className="bg-[#111] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
            >
                {/* Cabeçalho com botão de fechar */}
                <div className="p-4 flex justify-end"> 
                    <button 
                        onClick={() => setShowTrailer(false)} 
                        className="text-white hover:text-gray-300 cursor-pointer"
                    >
                        ✕ 
                    </button> 
                </div>

                {/* Conteúdo do trailer */}
                <div className="flex-1 p-3">
                    <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            src={`https://www.youtube.com/embed/${trailer}`}
                            title="Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};