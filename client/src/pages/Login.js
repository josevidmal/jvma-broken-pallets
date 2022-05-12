import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import validateEmail from '../utils/helpers';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [requiredField, setRequiredField] = useState('');
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!formState.email) {
            setRequiredField("Email address is required");
            return;
        } if (formState.email && !validateEmail(formState.email)) {
            setRequiredField("The Email address is not valid");
            return;
        } if (!formState.password) {
            setRequiredField("Password is required");
            return;
        }

        try{
            const { data } = await loginUser({
                variables: { ...formState },
            });

            Auth.login(data.loginUser.token);
        } catch (err) {
            console.error(err);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <section id="login-section" className="section-cards">
            <h2 className="section-headings">Login</h2>
            <form id="login-form" className="forms" onSubmit={handleFormSubmit}>
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

export default Login;