import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Navbar = () => {
	const { store } = useContext(Context) // 3. 2. 1
	return (
		<nav className="navbar navbar-dark bg-dark mb-3">
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
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Favorites
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">0</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end">
                  <li><span className="dropdown-item">No favorites selected</span></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
	);
};
