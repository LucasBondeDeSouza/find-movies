import React from "react";
import { Link } from "react-router-dom";

export default () => {

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-white text-center px-4">
            <h1 className="text-8xl font-bold text-red-600">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mt-4">
                Página não encontrada
            </h2>
            <p className="mt-2 text-gray-400 max-w-md">
                Opa! Parece que você se perdeu no catálogo.  
                Talvez queira voltar para o início?
            </p>

            <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-lg font-medium"
            >
                Voltar para o início
            </Link>
        </div>
    )
}