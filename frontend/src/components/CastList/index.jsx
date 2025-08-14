import React, { useState, useEffect } from "react"
import Tmdb from "../../Tmdb"

export default ({ setOverlay, type, movieId }) => {
    const [item, setItem] = useState(null)

    useEffect(() => {
        const loadCast = async () => {
            if (movieId && type) {
                const cast = await Tmdb.getMovieCast(movieId, type)
                setItem(cast.cast)
            }
        }

        loadCast()
    }, [type, movieId])

    console.log(item)

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#111] rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b p-4">
                    <h2 className="text-white text-lg font-bold">Elenco</h2>
                    <button
                        onClick={() => setOverlay(false)}
                        className="text-white hover:text-gray-300 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    )
}