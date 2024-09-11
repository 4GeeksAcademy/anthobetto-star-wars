import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";

export const Characters = () => {
    const { store, actions } = useContext(Context);
    actions.getCharacters();
    const navigate = useNavigate()

    // crear handle pagination (recibe un parámetro (y quizás un handle por previus and next))
    // dentro de la función llamo un action que cambie el currentPagePeople (le envío el número)
    // dentro de la función llamo a getCharacters 

    const viewMore = (uid) => {
        navigate(`/characters/${uid}`);
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
                {store.characters.length === 0 ? Spinner() :
                    store.characters.map(item => (
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
                                        <button type="button" className="btn btn-sm bg-warning" onClick={() => viewMore(item.uid)}>View more</button>
                                    </div>
                                    <span className="text-body-secondary">
                                        <i className="fa-regular fa-heart" onClick={() => favs(item)}></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};