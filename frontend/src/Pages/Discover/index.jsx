import React, { useState, useEffect } from "react";
import Tmdb from "../../Tmdb.js";
import FIlters from "../../components/FIlters/index.jsx";

export default () => {

    return (
        <div className="bg-[#111] min-h-screen">
            <h1 className="ml-[30px] pt-[50px] text-white text-3xl">Descobrir</h1>

            <FIlters />
        </div>
    );
};