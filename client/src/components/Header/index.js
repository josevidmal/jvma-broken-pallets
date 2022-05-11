import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { FaPallet, FaInfoCircle, FaTruck } from 'react-icons/fa'; 
import { GoSignIn } from 'react-icons/go';
import { GiArchiveRegister, GiFiles } from 'react-icons/gi';
import { RiLogoutBoxRFill, RiFileEditFill } from 'react-icons/ri';
import { BsFilePersonFill } from 'react-icons/bs';
import { MdLocalOffer } from 'react-icons/md';

const Header = () => {
    
    return (
        <header>
            <h1><FaPallet /> Broken Pallets</h1>
            {Auth.loggedIn() ? (
                <nav>
                    {Auth.getProfile().data.userType === 'Seller' ? (
                        <ul>
                            <li><Link to="/me/myOffers"><GiFiles /> My Offers</Link></li>
                            <li><Link to="/createOffer"><RiFileEditFill /> Create Offer</Link></li>
                            <li><Link to="/me"><BsFilePersonFill /> Profile</Link></li>
                            <li><Link onClick={Auth.logout} to="/"><RiLogoutBoxRFill /> Logout</Link></li>
                        </ul>
                    ) : (
                        <ul>
                            <li><Link to="/allOffers"><MdLocalOffer />All Offers</Link></li>
                            <li><Link to="/me/myPurchases"><FaTruck />My Purchases</Link></li>
                            <li><Link to="/me"><BsFilePersonFill /> Profile</Link></li>
                            <li><Link onClick={Auth.logout} to="/"><RiLogoutBoxRFill /> Logout</Link></li>
                        </ul>
                    )}
                </nav>
            ) : (
                <nav>
                    <ul>
                        <li><Link to="/"><FaInfoCircle /> About</Link></li>
                        <li><Link to="/login"><GoSignIn /> Login</Link></li>
                        <li><Link to="/signup"><GiArchiveRegister /> Sign Up</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;