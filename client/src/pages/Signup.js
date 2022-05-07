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
        } if (!formState.userType) {
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
        <section>
            <h2>Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input 
                    name="firstName"
                    type="text"
                    value={formState.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name:</label>
                <input 
                    name="lastName"
                    type="text"
                    value={formState.lastName}
                    onChange={handleChange}
                />
                <label htmlFor="company">Company:</label>
                <input 
                    name="company"
                    type="text"
                    value={formState.company}
                    onChange={handleChange}
                />
                <label htmlFor="username">Username:</label>
                <input 
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email:</label>
                <input 
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password:</label>
                <input 
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                />
                <label htmlFor="userType">User Type:</label>
                <select name="userType" value={formState.userType} onChange={handleChange}>
                    <option value="Seller">Seller</option>
                    <option value="Recycler">Recycler</option>
                </select>
                {requiredField && (
                    <p>{requiredField}</p>
                )}
                <button type="submit" onClick={handleFormSubmit}>Submit</button>
            </form>
            {error && (
                <p>{error.message}</p>
            )}
        </section>
    );
};

export default Signup;