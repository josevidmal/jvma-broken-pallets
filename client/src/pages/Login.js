import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
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

        try{
            const { data } = await loginUser({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <section>
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
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
                <button type="submit" onClick={handleFormSubmit}>Submit</button>
            </form>
            {error && (
                <p>{error.message}</p>
            )}
        </section>
    );
};

export default Login;