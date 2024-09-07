import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
export const Contacts = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const deleteContact = (id) => {
        actions.deleteContact(id)
    }
    const editContact = async (itemContact) => {
        actions.setCurrentContacts(itemContact);
        navigate('/edit-contact')
    }
    return (
        <div className="container bg-dark mb-3">
            <div className="navbar navbar-dark bg-dark">
                <h1 className="text-light pt-4">Contacts</h1>
                <Link to="/add-contact">
                    <button className="btn btn-secondary">Add Contact</button>
                </Link>
            </div>
            <ul>
                {store.contacts.map((item) =>
                    <li key={item.id}>
                        <div className="card mb-3 d-flex justify-content-between bg-dark" >
                            <div className="card mb-3">
                                <div className="row g-0 bg-secondary bg-opacity-10">
                                    <div className="col-3 col-md-2 p-2 d-flex align-items-center justify-content-center">
                                        <img
                                            src="https://www.kindpng.com/picc/m/31-312039_transparent-stormtrooper-clipart-trooper-star-wars-vector-hd.png"
                                            className="img-fluid rounded-circle"
                                            style={{ width: "100px", height: "100px" }}
                                            alt="Star Wars - Soldier"
                                        />
                                    </div>
                                    <div className="col-7 col-md-8 p-2">
                                        <div className="card-body">
                                            <h6 className="card-title mb-1"></h6>
                                            <p className="card-text small mb-1">
                                                <i class="fa-regular fa-address-book me-2"></i>
                                                {item.name}
                                                <br />
                                                <i class="fa-solid fa-map-location-dot me-2"></i>
                                                {item.address}
                                                <br />
                                                <i class="fa-solid fa-square-phone me-2"></i>
                                                {item.phone}
                                                <br />
                                                <i className="fa-regular fa-envelope me-2"></i>
                                                {item.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-2 col-md-2 d-flex align-items-center justify-content-center">
                                        <div className="d-flex justify-content-evenly">
                                            <span onClick={() => editContact(item)}>
                                            <i class="fa-solid fa-user-pen"></i>
                                            </span>
                                            <span onClick={() => deleteContact(item.id)}>
                                                <i className="fas fa-trash text-danger ms-2"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                )}
            </ul >
        </div >
    )
}