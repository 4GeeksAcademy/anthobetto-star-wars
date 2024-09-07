import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
export const AddContact = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAdress] = useState('')
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = {
            "name": name,
            "phone": phone,
            "email": email,
            "address": address,
        }
        actions.addContact(dataToSend);
        navigate('/contacts');
    };
    const handleCancel = () => {
        navigate('/contacts');
    };
    return (
        <div className="container mt-4">
            <h1 className="justify-content-center">Add new contact</h1>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-12 my-4">
                    <input type="text" className="form-control" placeholder="Full Name" aria-label="Full Name" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="col-12 my-4">
                    <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="col-12 my-4">
                    <input type="tel" className="form-control" placeholder="Enter phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div className="col-12 my-4">
                    <input type="text" className="form-control" placeholder="Enter address" value={address} onChange={(event) => setAdress(event.target.value)} />
                </div>
                <div className="col-12 my-4 d-flex justify-content-end">
                    <button type="submit" className="btn btn-dark me-3">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}