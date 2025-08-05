import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Home from "./Pages/Home"
import Details from "./Pages/Details"

export default () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:type/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  )
}