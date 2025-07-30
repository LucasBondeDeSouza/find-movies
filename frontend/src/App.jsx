import React from "react"
import MoviesFeatured from "./components/MoviesFeatured"

export default () => {

  const apiKey = import.meta.env.VITE_API_KEY;

  return (
    <>
      <MoviesFeatured api={apiKey} />
    </>
  )
}