import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
			<div>
			<img src="https://wallpaperaccess.com/full/3782099.jpg" className="img-fluid" alt="star-wars-poster" />
			</div>
	);
};
