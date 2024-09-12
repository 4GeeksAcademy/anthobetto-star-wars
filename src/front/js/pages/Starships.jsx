import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx"

export const Starships = () => {
    const { store, actions } = useContext(Context);
    actions.getStarships();
    const navigate = useNavigate()

    const handleError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }

    const viewMore = (uid) => {
        navigate(`/starships/${uid}`);
    };
    return (
        <div className="container mt-5 mb-5">
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                    <li class="page-item">
                        <a class="page-link text-dark bg-warning" href="#">Previous</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link text-dark bg-warning" href="#">1</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link text-dark bg-warning" href="#">2</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link text-dark bg-warning" href="#">3</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link text-dark bg-warning" href="#">Next</a>
                    </li>
                </ul>
            </nav>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                {store.starships.length === 0 ? Spinner() : 
                store.starships.map(item => (
                    <div key={item.uid} className="col">
                        <div className="card my-3 mx-2">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/starships/${item.uid}.jpg`}
                                className="card-img-top"
                                alt={item.name}
                                onError={handleError}
                                style = {{aspectRatio:"1/1", width:'100%'}}
   
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                            </div>
                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm bg-warning" onClick={() => viewMore(item.uid)}>View more</button>
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