import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'
import Auth from '../utils/auth';

const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || {};
    console.log(userData);
    if (loading) {
        return <div>Loading...</div>
    }

    if (!Auth.loggedIn()) {
        return (
            <h3>You need to be logged in</h3>
        );
    }

    return (
        <section>
            <h2>User Information</h2>
            <ul>
                <li>Name: {`${userData.firstName} ${userData.lastName}`}</li>
                <li>Company: {`${userData.company}`}</li>
                <li>Username: {`${userData.username}`}</li>
                <li>Email: {`${userData.email}`}</li>
                <li>User Type: {`${userData.userType}`}</li>
            </ul>
        </section>
    );
};

export default Profile;