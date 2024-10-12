import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const Protected = () => {
    const { actions } = useContext(Context)
    const navigate = useNavigate()
    const handleDenied = () => {
        actions.accessDenied()
        navigate("/login")

    }
    return (
        <div className="container row d-flex justify-content-center align-items-center m-4 p-4">
            <div className="alert alert-danger mb-4" role="alert">
                Access Denied! You do not have permission to view this page.
            </div>

            <button className=" btn btn-warning btn-lg p-4 col-4 " onClick={handleDenied}>
                Acceso restingido
            </button>
        </div>
    )
}