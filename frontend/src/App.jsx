import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom"
import axios from "axios"

import { UserContextProvider, useUserContext } from "./contexts/UserContext";

import { ToastContainer } from "react-toastify";

import Header from "./components/Header" 
import Home from "./Pages/Home" 
import Details from "./Pages/Details" 
import Discover from "./Pages/Discover" 
import Search from "./Pages/Search" 
import MyList from "./Pages/MyList" 
import Login from "./Pages/Login" 
import NotFound from "./Pages/NotFound" 
import PageLoader from "./Pages/PageLoader"
import Register from "./Pages/Register";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
axios.defaults.withCredentials = true

export default () => {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
};

function AppContent() {
  const { isLoading } = useUserContext();

  return (
    <div>
      <BrowserRouter>
        <Header />
        {isLoading && <PageLoader />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:type/:id" element={<Details />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/search" element={<Search />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}