import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="page-container">
			<div className="content-wrap text-center mt-4">
			<h1>En Construcción 🚧</h1>
			</div>
		</div>	
	);
};
