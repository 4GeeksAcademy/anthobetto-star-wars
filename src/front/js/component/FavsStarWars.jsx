import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const FavsStarWars = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="dropdown">
      <button 
        className="btn btn-dark dropdown-toggle" 
        type="button" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        Starred
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
          {store.favorites.length}
        </span>
      </button>
      
      <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end p-3">
        {store.favorites.length > 0 ? (
          store.favorites.map((item, index) => (
            <li 
              key={index} 
              className="d-flex justify-content-between align-items-center mb-2 "
            >
              <span className="dropdown-item me-3">{item.name} - {item.type}</span>
              <button 
                className="btn btn-dark ms-2 text-danger cursor-pointer" type="button"
                onClick={() => actions.removeFromFavorites(item)} 
              >
                <i className="fas fa-trash"></i>
              </button>
            </li>
          ))
        ) : (
          <li className="text-center">No favorites yet</li>
        )}
      </ul>
    </div>
  );
}