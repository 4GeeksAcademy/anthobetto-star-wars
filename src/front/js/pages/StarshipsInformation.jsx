import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";


export const StarshipsInformation = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    const handleError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }


    useEffect(() => {
        actions.getStarshipsInformation(params.uid);
        return () => {
            actions.clearStarshipsInformation();
        };
    }, []);

    return (
        <div className="container mt-5 mb-5">
            {!store.starshipsInformation?.name ? (
                Spinner()
            ) : (
                <>
                    <div className="card mb-3 mx-2" style={{ maxWidth: "800px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/starships/${params.uid}.jpg`}
                                    className="img-fluid rounded-start"
                                    alt="Planets"
                                    onError={handleError}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{store.starshipsInformation.name}</h5>
                                    <p className="card-text">Starship class: {store.starshipsInformation.starship_class}</p>
                                    <p className="card-text">Manufacturer: {store.starshipsInformation.manufacturer}</p>
                                    <p className="card-text">Length: {store.starshipsInformation.length}</p>
                                    <p className="card-text">Crew: {store.starshipsInformation.crew}</p>
                                    <p className="card-text">Passengers: {store.starshipsInformation.passengers}</p>
                                    <p className="card-text">Max atmosphering_ speed: {store.starshipsInformation.max_atmosphering_speed}</p>
                                    <p className="card-text">Hyperdrive rating: {store.starshipsInformation.hyperdrive_rating}</p>
                                    <p className="card-text">MGLT: {store.starshipsInformation.MGLT}</p>
                                    <p className="card-text">Cargo Capacity: {store.starshipsInformation.cargo_capacity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};