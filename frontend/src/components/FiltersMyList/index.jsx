import React from "react";

export default ({ selectedStatuses, setSelectedStatuses }) => {

    const handleClick = (status) => {
        if (selectedStatuses.includes(status)) {
            // remove do array se já estiver selecionado
            setSelectedStatuses(selectedStatuses.filter(s => s !== status));
        } else {
            // adiciona ao array
            setSelectedStatuses([...selectedStatuses, status]);
        }
    }

    const buttons = [
        { label: "Não Assistido", value: "planned" },
        { label: "Assistindo", value: "watching" },
        { label: "Assistido", value: "watched" }
    ];

    return (
        <div className="p-6 text-white">
            <div className="flex flex-wrap gap-3">
                {buttons.map(btn => (
                    <button
                        key={btn.value}
                        onClick={() => handleClick(btn.value)}
                        className={`px-4 py-2 rounded-full border transition cursor-pointer
                            ${selectedStatuses.includes(btn.value)
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400"
                            }`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    )
}