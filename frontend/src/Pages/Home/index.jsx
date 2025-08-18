import React from "react";

import FeaturedMovie from "../../components/FeaturedMovie";
import Trendings from "../../components/Trendings";

export default () => {

    return (
        <div className="bg-[#111]">
            <FeaturedMovie />
    
            <div className="bg-transparent translate-y-[-60px] lg:translate-y-[-100px]">
                <Trendings slug_db={"serie_netflix"} type={"tv"} />
                <Trendings slug_db={"filme_netflix"} type={"movie"} />
                <Trendings slug_db={"toprated"} type={"movie"} />
                <Trendings slug_db={"movieposter"} type={"movie"} />
                <Trendings slug_db={"action"} type={"movie"} />
                <Trendings slug_db={"comedy"} type={"movie"} />
                <Trendings slug_db={"drama"} type={"movie"} />
                <Trendings slug_db={"horror"} type={"movie"} />
            </div>
        </div>
    )
}