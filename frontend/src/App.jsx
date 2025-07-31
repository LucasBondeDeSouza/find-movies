import React, {useState, useEffect} from "react"
import Tmdb from './Tmdb'
import FeaturedMovie from "./components/FeaturedMovie"

export default () => {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      // Definindo featured inicialmente e a cada 30 segundos
      setRandomFeatured(list)
      
      // Inicia o intervalo para trocar o FeaturedMovie a cada 30s
      const interval = setInterval(() => {
        setRandomFeatured(list)
      }, 15000)

      // Limpa o intervalo ao desmontar
      return () => clearInterval(interval)
    }

    const setRandomFeatured = async (list) => {
      let originals = list.filter(i => i.slug === 'originals')
      if (originals.length > 0) {
        let randomChosen = Math.floor(Math.random() * originals[0].items.results.length)
        let chosen = originals[0].items.results[randomChosen]
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
        setFeaturedData(chosenInfo)
      }
    }

    loadAll()
  }, [])

  return (
    <>
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
    </>
  )
}