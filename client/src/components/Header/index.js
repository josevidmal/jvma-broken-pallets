import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    
    return (
        <header>
            <h1>Broken Pallets</h1>
            {Auth.loggedIn() ? (
                <nav>
                    {Auth.getProfile().data.userType === 'Seller' ? (
                        <ul>
                            <li><Link to="/me/myOffers">My Offers</Link></li>
                            <li><Link to="/createOffer">Create Offer</Link></li>
                            <li><Link to="/me">Profile</Link></li>
                            <li><Link onClick={Auth.logout} to="/">Logout</Link></li>
                        </ul>
                    ) : (
                        <ul>
                            <li><Link to="/allOffers">All Offers</Link></li>
                            <li><Link to="/me/myPurchases">My Purchases</Link></li>
                            <li><Link to="/me">Profile</Link></li>
                            <li><Link onClick={Auth.logout} to="/">Logout</Link></li>
                        </ul>
                    )}
                </nav>
            ) : (
                <nav>
                    <ul>
                        <li><Link to="/">About</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;