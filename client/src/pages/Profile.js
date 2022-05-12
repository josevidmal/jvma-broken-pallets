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
        <section id="profile-section" className="section-cards">
            <h2 className="section-headings">User Information</h2>
            <ul>
                <li className="cards-list-items">Name: {`${userData.firstName} ${userData.lastName}`}</li>
                <li className="cards-list-items">Company: {`${userData.company}`}</li>
                <li className="cards-list-items">Username: {`${userData.username}`}</li>
                <li className="cards-list-items">Email: {`${userData.email}`}</li>
                <li className="cards-list-items">User Type: {`${userData.userType}`}</li>
            </ul>
        </section>
    );
};

export default Profile;