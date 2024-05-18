import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userData");
    updateUser();
    navigate("/");
  };

  return (
    <div className="bg-slate-900 navbar ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
          >
            <li>
              <Link to="/trending">Trending</Link>
            </li>
            <li>
              <a>Category</a>
              <ul className="p-2">
                <li>
                  <Link to="/world">WORLD</Link>
                </li>
                <li>
                  <Link to="/sports">SPORTS</Link>
                </li>
                <li>
                  <Link to="/other">OTHER</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/contradictory">Contradictory News</Link>
            </li>
            <li>
              {user?.name ? (
                <Link onClick={handleSignOut}>Sign Out</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          TruNews
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/trending"
              className={` mr-2 text-white hover:bg-blue-700 ${
                activeLink === "trending"
                  ? "bg-blue-700 focus:bg-blue-700 focus:text-white"
                  : ""
              }`}
              onClick={() => handleLinkClick("trending")}
            >
              Trending
            </Link>
          </li>
          <li>
            <details>
              <summary
                className={` mr-2 text-white hover:bg-blue-700 ${
                  activeLink === "category"
                    ? "bg-blue-700 focus:bg-blue-700 focus:text-white"
                    : ""
                }`}
                onClick={() => handleLinkClick("category")}
              >
                Category
              </summary>
              <ul className="p-2 z-10">
                <li>
                  <Link to="/world">WORLD</Link>
                </li>
                <li>
                  <Link to="/sports">SPORTS</Link>
                </li>
                <li>
                  <Link to="/other">OTHER</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link
              to="/contradictory"
              className={`text-white  hover:bg-blue-700 ${
                activeLink === "contradictory"
                  ? "bg-blue-700 focus:bg-blue-700 focus:text-white"
                  : ""
              }`}
              onClick={() => handleLinkClick("contradictory")}
            >
              Contradictory News
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user?.name ? (
          <div className="flex gap-2 justify-center items-center">
            <p className="hidden md:block text-white">Welcome, {user?.name}</p>
            <Link
              onClick={handleSignOut}
              className="bg-blue-700 text-white p-2 rounded"
            >
              Sign Out
            </Link>
          </div>
        ) : (
          <Link to="/login" className="btn btn-accent">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
