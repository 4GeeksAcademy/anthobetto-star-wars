import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


export const Dashboard = () => {
  const { actions } = useContext(Context);

  const handleOnClick = () => {
    actions.accessProtected()
  }

  return (
    <div className="container">
      <h1 className="display-1">Dashboard</h1>
      <button className="btn btn-warning" onClick={handleOnClick}>
          Acceso a Protected
      </button>
    </div>
  )
}