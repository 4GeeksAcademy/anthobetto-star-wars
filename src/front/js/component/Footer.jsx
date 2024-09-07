import React, { Component, useContext } from "react";
import { Context } from "../store/appContext.js";

 export const Footer = () => {
	const {store} = useContext(Context)
	return(
	<footer className="footer mt-auto py-4 text-center bg-dark text-white">
            <p>
                Made with <i className="fa fa-heart text-danger" /> by {" "} Anthony Flores for {" "}  
                <a href="http://www.4geeksacademy.com" target="_blank" rel="noopener noreferrer">
				4Geeks Academy
                </a>
            </p>
        </footer>
)
};
