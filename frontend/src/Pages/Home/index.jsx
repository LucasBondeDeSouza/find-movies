import React from "react";
import FeaturedMovie from "../../components/FeaturedMovie";
import Trendings from "../../components/Trendings";

export default () => {

    return (
        <div className="bg-[#111]">
            <FeaturedMovie />
    
            <div className="bg-transparent translate-y-[-60px] lg:translate-y-[-80px]">
                <Trendings slug_db={"serie_netflix"} />
                <Trendings slug_db={"filme_netflix"}  />
                <Trendings slug_db={"toprated"}  />
                <Trendings slug_db={"movieposter"}  />
                <Trendings slug_db={"action"}  />
                <Trendings slug_db={"comedy"}  />
                <Trendings slug_db={"drama"}  />
                <Trendings slug_db={"horror"}  />
            </div>
        </div>
    )
}