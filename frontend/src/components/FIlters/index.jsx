import React, { useState, useEffect } from "react";
import Tmdb from "../../Tmdb.js";

export default () => {
    const [type, setType] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [categories, setCategories] = useState([]);
    const [selectedCetegories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const items = await Tmdb.getCategories(type);
            setCategories(items.genres);
        };

        loadCategories();
    }, [type]);

    const toggleCategory = (categoryId) => {
        if (selectedCetegories.includes(categoryId)) {
            // Se já está selecionada, remove
            setSelectedCategories(selectedCetegories.filter((id) => id !== categoryId));
        } else {
            // Se não está selecionada, adiciona
            setSelectedCategories([...selectedCetegories, categoryId]);
        }
    };

    return (
        <>
            <div className="p-6 text-white flex gap-3">
                <button 
                    className={`px-4 py-2 rounded-full border transition cursor-pointer 
                    ${selectedType == 'filme' 
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400"
                    }`}
                    onClick={() => {setType('movie'); setSelectedType('filme')}}>Filme</button>

                <button 
                    className={`px-4 py-2 rounded-full border transition cursor-pointer 
                    ${selectedType == 'serie' 
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400"
                    }`}
                    onClick={() => {setType('tv'); setSelectedType('serie')}}>Série</button>
            </div>

            <div className="p-6 text-white">
                <h1 className="text-2xl font-bold mb-4">Filtrar por Categoria</h1>
                
                <div className="flex flex-wrap gap-3 mb-6">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => toggleCategory(category.id)}
                            className={`px-4 py-2 rounded-full border transition cursor-pointer 
                            ${selectedCetegories.includes(category.id)
                                ? "bg-blue-500 border-blue-500 text-white" 
                                : "bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400"
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};