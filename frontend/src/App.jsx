import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./screens/auth/Signup";
import Login from "./screens/auth/Login";
import LandingPage from "./screens/LandingPage";
import NewsDetail from "./screens/news/NewsDetail";
import Navbar from "./components/Navbar";
import AddNews from "./screens/news/AddNews";
import ManageNews from "./screens/news/ManageNews";
import { UserProvider, useUser } from "./hooks/UserContext";
import TrendingNews from "./screens/news/TrendingNews";
import ContradictoryNews from "./screens/news/ContradictoryNews";
import WorldNews from "./screens/news/WorldNews";
import SportsNews from "./screens/news/SportsNews";
import OtherNews from "./screens/news/OtherNews";
import UpdateNews from "./screens/news/UpdateNews";

function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

function App() {
  const { updateUser } = useUser();

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<NewsDetail />} />
        <Route path="/:id/addnews" element={<AddNews />} />
        <Route path="/:id/:userid/update" element={<UpdateNews />} />
        <Route path="/managenews" element={<ManageNews />} />
        <Route path="/trending" element={<TrendingNews />} />
        <Route path="/contradictory" element={<ContradictoryNews />} />
        <Route path="/world" element={<WorldNews />} />
        <Route path="/sports" element={<SportsNews />} />
        <Route path="/other" element={<OtherNews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWrapper;
