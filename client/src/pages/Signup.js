import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import validateEmail from '../utils/helpers';

const Signup = () => {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        company: '',
        username: '',
        email: '',
        password: '',
        userType: '', 
    });

    const [requiredField, setRequiredField] = useState('');

    const [addUser, { error }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!formState.firstName) {
            setRequiredField("First Name is required");
            return;
        } if (!formState.lastName) {
            setRequiredField("Last Name is required");
            return;
        } if (!formState.company) {
            setRequiredField("Company is required");
            return;
        } if (!formState.username) {
            setRequiredField("Username is required");
            return;
        } if (!formState.email) {
            setRequiredField("Email address is required");
            return;
        } if (formState.email && !validateEmail(formState.email)) {
            setRequiredField("The Email address is not valid");
            return;
        } if (!formState.password) {
            setRequiredField("Password is required");
            return;
        } if (!formState.userType || formState.userType === '') {
            setRequiredField("Please select a User Type");
            return;
        }

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section id="signup-section" className="section-cards">
            <h2 className="section-headings">Sign Up</h2>
            <form id="signup-form" className="forms" onSubmit={handleFormSubmit}>
                <label className="forms-labels" htmlFor="firstName">First Name:</label>
                <input 
                    className="form-inputs"
                    name="firstName"
                    type="text"
                    value={formState.firstName}
                    onChange={handleChange}
                />
                <label className="forms-labels" htmlFor="lastName">Last Name:</label>
                <input 
                    className="form-inputs"
                    name="lastName"
                    type="text"
                    value={formState.lastName}
                    onChange={handleChange}
                />
                <label className="forms-labels" htmlFor="company">Company:</label>
                <input 
                    className="form-inputs"
                    name="company"
                    type="text"
                    value={formState.company}
                    onChange={handleChange}
                />
                <label className="forms-labels" htmlFor="username">Username:</label>
                <input 
                    className="form-inputs"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                />
                <label className="forms-labels" htmlFor="email">Email:</label>
                <input 
                    className="form-inputs"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <label className="forms-labels" htmlFor="password">Password:</label>
                <input 
                    className="form-inputs"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                />
                <label className="forms-labels" htmlFor="userType">User Type:</label>
                <select className="form-selects" name="userType" defaultValue="" onChange={handleChange}>
                    <option value=""></option>
                    <option value="Seller">Seller</option>
                    <option value="Recycler">Recycler</option>
                </select>
                {requiredField && (
                    <p className="required-fields">{requiredField}</p>
                )}
                <div className="forms-btn-div">
                    <button className="btns" type="submit">Submit</button>
                </div>
            </form>
            {error && (
                <p className="error-messages">{error.message}</p>
            )}
        </section>
    );
};

export default Signup;