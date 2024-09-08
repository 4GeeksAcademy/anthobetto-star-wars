import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);
    actions.getCharacters();
    const navigate = useNavigate()
        
    
    const viewMore = (uid) => {
        navigate('/character-information/${uid}')
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                {store.characters.map(item => (
                    <div key={item.uid} className="col">
                        <div className="card my-3 mx-2">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`}
                                className="card-img-top"
                                alt={item.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                            </div>
                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm bg-warning" onClick={() => viewMore(item)}>View more</button>
                                </div>
                                <span className="text-body-secondary">
                                    <i className="fa-regular fa-heart"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};