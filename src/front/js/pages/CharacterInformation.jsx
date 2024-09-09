import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const CharacterInformation = () => {
    const {store, actions } = useContext(Context) 


    return (
        <div className="container mt-5 mb-5">
            <div className="card mb-3">
                <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`}
                    className="card-img-top"
                    alt={namecard}
                />
                <div className="card-body">
                    <h5 className="card-title">{nametitle}</h5>
                    <p className="card-text"><strong>Height:</strong> {height} cm</p>
                    <p className="card-text"><strong>Mass:</strong> {mass} kg</p>
                    <p className="card-text"><strong>Hair Color:</strong> {hair_color}</p>
                    <p className="card-text"><strong>Skin Color:</strong> {skin_color}</p>
                    <p className="card-text"><strong>Eye Color:</strong> {eye_color}</p>
                    <p className="card-text"><strong>Birth Year:</strong> {birth_year}</p>
                    <p className="card-text"><strong>Gender:</strong> {gender}</p>
                </div>
            </div>
        </div>
    );
};