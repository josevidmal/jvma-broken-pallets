import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { REMOVE_PURCHASE } from '../../utils/mutations';
import Auth from '../../utils/auth';

const MyPurchasesList = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const me = data?.me || {};
    const [removePurchase] = useMutation(REMOVE_PURCHASE);

    const handleRemovePurchase = async (offerId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removePurchase({
                variables: { offerId }
            });

            if (!data) {
                throw new Error('something did not work!');
            }
        } catch (err) {
            console.error(err);
        }
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Auth.loggedIn()) {
        return (
            <h3>You need to be logged in</h3>
        );
    } if (Auth.getProfile().data.userType !== 'Recycler') {
        return (
            <h3>Content available only for Recyclers</h3>
        )
    }

    return (
        <section id="myPurchases-section" className="offers-sections">
            <h2 className="section-headings">My Purchases</h2>
            {me.myPurchases?.map((myPurchase) => (
                    <div className="section-cards offer-cards" key={myPurchase._id}>
                        <h4 className="offer-ids">Order ID: <span className="cards-spans">{myPurchase._id}</span></h4>
                        <ul className="offer-lists">
                            <li className="cards-list-items">Seller: <span className="cards-spans">{myPurchase.seller}</span></li>
                            <li className="cards-list-items">Email: <span className="cards-spans"><a className="mail-links" href={`mailto:${myPurchase.email}`}>{myPurchase.email}</a></span></li>
                            <li className="cards-list-items">Pallets: <span className="cards-spans">{myPurchase.palletQty}</span></li>
                            <li className="cards-list-items">Price: <span className="cards-spans">${myPurchase.price.toLocaleString('en-US')} MXN</span></li>
                            <li className="cards-list-items">Material: <span className="cards-spans">{myPurchase.material}</span></li>
                            <li className="cards-list-items">Dimension: <span className="cards-spans">{myPurchase.dimension}</span></li>
                            <li className="cards-list-items">Address: <span className="cards-spans">{myPurchase.address}</span></li>
                            <li className="cards-list-items">State: <span className="cards-spans">{myPurchase.state}</span></li>
                            {myPurchase.offerStatus === 'Active' ? (<li className="cards-list-items">Status: <span className="cards-spans">Active</span></li>) : (<li className="cards-list-items">Status: <span className="cards-spans">Purchased By {myPurchase.offerStatus}</span></li>)}
                        </ul>
                        <img className="offer-img" src={require(`../../assets/images/${myPurchase.image}`)} alt='damaged-pallets' />
                        <div className="offer-btn-div">
                            <button id="remove-btn" className="btns delete-btns" onClick={() => handleRemovePurchase(myPurchase._id)}>Remove</button>
                        </div>
                    </div>
            ))}
        </section>
    );
};

export default MyPurchasesList;