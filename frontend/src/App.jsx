import React from "react"
import FeaturedMovie from "./components/FeaturedMovie"
import Trendings from "./components/Trendings"

export default () => {

  return (
    <div className="bg-[#111]">
      <FeaturedMovie />
      <Trendings slug_db={"serie_netflix"} />
      <Trendings slug_db={"filme_netflix"}  />
    </div>
  )
}