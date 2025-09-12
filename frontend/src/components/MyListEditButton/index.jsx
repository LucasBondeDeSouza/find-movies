import React, { useState } from "react";
import axios from "axios"

export default ({ initialStatus, itemId }) => {
    const [status, setStatus] = useState(initialStatus);
    const [open, setOpen] = useState(false);

    const handleSelect = async (newStatus) => {
        setStatus(newStatus);
        setOpen(false);

        try {
            await axios.post("/", { id: itemId, status: newStatus });
        } catch (err) {
            console.error("Erro ao atualizar status:", err);
        }
    };

    return (
        <div className="absolute bottom-1 right-1">
            {status === "planned" && <p className="text-sm text-white bg-red-600 py-0.5 px-1.5 rounded-xl">Não Assistido</p>}
            {status === "watching" && <p className="text-sm text-white bg-orange-600 py-0.5 px-1.5 rounded-xl">Assistindo</p>}
            {status === "watched" && <p className="text-sm text-white bg-green-600 py-0.5 px-1.5 rounded-xl">Assistido</p>}
        </div>
    )
}