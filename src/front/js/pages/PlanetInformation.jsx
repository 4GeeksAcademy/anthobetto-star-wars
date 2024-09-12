import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";


export const PlanetInformation = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    const handleError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }

    useEffect(() => {
        actions.getPlanetInformation(params.uid);
        return () => {
            actions.clearPlanetInformation();
        };
    }, []);

    return (
        <div className="container mt-5 mb-5">
            {!store.planetInformation?.name ? (
                Spinner()
            ) : (
                <>
                    <div className="card mb-3 mx-2" style={{ maxWidth: "800px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/planets/${params.uid}.jpg`}
                                    className="img-fluid rounded-start"
                                    alt="Planets"
                                    onError={handleError}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{store.planetInformation.name}</h5>
                                    <p className="card-text">Diameter: {store.planetInformation.diameter}</p>
                                    <p className="card-text">Rotation period: {store.planetInformation.rotation_period}</p>
                                    <p className="card-text">Orbital period: {store.planetInformation.orbital_period}</p>
                                    <p className="card-text">Gravity: {store.planetInformation.gravity}</p>
                                    <p className="card-text">Population: {store.planetInformation.population}</p>
                                    <p className="card-text">Climate: {store.planetInformation.Climate}</p>
                                    <p className="card-text">Terrain: {store.planetInformation.terrain}</p>
                                    <p className="card-text">Surface water: {store.planetInformation.surface_water}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};