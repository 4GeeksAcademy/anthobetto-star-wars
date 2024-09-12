import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { FavsStarWars } from "./FavsStarWars.jsx";

export const Navbar = () => {
	const { store } = useContext(Context) // 3. 2. 1
	return (
		<nav className="navbar navbar-dark bg-warning">
      <div className="container-fluid d-flex justify-content-between mx-md-4 mt-2 mb-1">
        <div>
          <Link className="navbar-brand" to="/">
            <img height="55" src="https://pngimg.com/d/star_wars_logo_PNG20.png" alt="Star Wars Logo" />
          </Link>
        </div>
        <div>
          <ul className="nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link link-secondary" to="/characters">
                Characters
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-secondary" to="/planets">
                Planets
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-secondary" to="/starships">
                Starships
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-secondary" to="/contacts">
                Contacts
              </Link>
            </li>
            <li className="nav-item">
              <FavsStarWars/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
	);
};
