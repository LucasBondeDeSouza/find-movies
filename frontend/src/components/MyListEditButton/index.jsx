import React, { useState } from "react";
import axios from "axios"

export default ({ initialStatus, itemId }) => {
    const [status, setStatus] = useState(initialStatus);
    const [open, setOpen] = useState(false);

    const handleSelect = async (newStatus) => {
        setStatus(newStatus);
        setOpen(false);

        try {
            await axios.put("/my-list", { id: itemId, status: newStatus });
        } catch (err) {
            console.error("Erro ao atualizar status:", err);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "planned":
                return "text-white bg-red-600";
            case "watching":
                return "text-white bg-orange-600";
            case "watched":
                return "text-white bg-green-600";
            default:
                return "text-white bg-gray-500";
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "planned":
                return "Não Assistido";
            case "watching":
                return "Assistindo";
            case "watched":
                return "Assistido";
            default:
                return "-";
        }
    };

    return (
        <div className="absolute top-1 right-1">
            <div
                onClick={() => setOpen(!open)}
                className={`cursor-pointer text-sm py-0.5 px-1.5 rounded-xl ${getStatusStyle(status)}`}
            >
                {getStatusLabel(status)}
            </div>

            {open && (
                <div className="absolute right-0 mt-2 w-32 bg-zinc-900 text-white text-sm shadow-lg rounded-md z-10">
                    <p
                        onClick={() => handleSelect("planned")}
                        className="px-3 py-1 cursor-pointer hover:bg-zinc-800 rounded-md"
                    >
                        Não Assistido
                    </p>
                    <p
                        onClick={() => handleSelect("watching")}
                        className="px-3 py-1 cursor-pointer hover:bg-zinc-800 rounded-md"
                    >
                        Assistindo
                    </p>
                    <p
                        onClick={() => handleSelect("watched")}
                        className="px-3 py-1 cursor-pointer hover:bg-zinc-800 rounded-md"
                    >
                        Assistido
                    </p>
                </div>
            )}
        </div>
    )
}