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
                <li className="cards-list-items">Name: <span className="cards-spans">{`${userData.firstName} ${userData.lastName}`}</span></li>
                <li className="cards-list-items">Company: <span className="cards-spans">{`${userData.company}`}</span></li>
                <li className="cards-list-items">Username: <span className="cards-spans">{`${userData.username}`}</span></li>
                <li className="cards-list-items">Email: <span className="cards-spans">{`${userData.email}`}</span></li>
                <li className="cards-list-items">User Type: <span className="cards-spans">{`${userData.userType}`}</span></li>
            </ul>
        </section>
    );
};

export default Profile;