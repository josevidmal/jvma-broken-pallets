import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_OFFERS } from '../../utils/queries';
import { ADD_PURCHASE } from '../../utils/mutations';
import Auth from '../../utils/auth';

const AllOffersList = () => {
    const { loading, data } = useQuery(QUERY_OFFERS);
    const offers = data?.offers || [];
    const [addPurchase, { error }] = useMutation(ADD_PURCHASE);
    console.log(offers);

    const handleSaveOffer = async (offerId) => {

        try {
            const { data } = await addPurchase({
                variables: { offerId }
            });
            if (!data) {
                throw new Error('something did not work!');
            }
        } catch (err) {
            console.error(err);
        }

        window.location.assign('me/myPurchases');
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
            <h3>Content available only for Recylcers</h3>
        )
    }

    return (
        <section id="allOffers-section" className="offers-sections">
            <h2 className="section-headings">All Offers</h2>
            {offers.map((offer) => (
                <div className="section-cards offer-cards" key={offer._id}>
                    <h4 className="offer-ids">Offer ID: <span className="cards-spans">{offer._id}</span></h4>
                    <ul className="offer-lists">
                        <li className="cards-list-items">Seller: <span className="cards-spans">{offer.seller}</span></li>
                        <li className="cards-list-items">Email: <span className="cards-spans">{offer.email}</span></li>
                        <li className="cards-list-items">Pallets: <span className="cards-spans">{offer.palletQty}</span></li>
                        <li className="cards-list-items">Price: <span className="cards-spans">${offer.price.toLocaleString('en-US')} MXN</span></li>
                        <li className="cards-list-items">Material: <span className="cards-spans">{offer.material}</span></li>
                        <li className="cards-list-items">Dimension: <span className="cards-spans">{offer.dimension}</span></li>
                        <li className="cards-list-items">Address: <span className="cards-spans">{offer.address}</span></li>
                        <li className="cards-list-items">State: <span className="cards-spans">{offer.state}</span></li>
                        {offer.offerStatus === 'Active' ? (<li className="cards-list-items">Status: <span className="cards-spans">Active</span></li>) : (<li className="cards-list-items">Status: <span className="cards-spans">Purchased</span></li>)}
                        <li className="cards-list-items">Date Created: <span className="cards-spans">{offer.dateCreated}</span></li>
                    </ul>
                    <img className="offer-img" src={require(`../../assets/images/${offer.image}`)} alt='damaged-plastic-pallets'/>
                    <div className="offer-btn-div">
                        {offer.offerStatus === 'Active' ? (<button id="buy-btn" className="btns" onClick={() => handleSaveOffer(offer._id)}>Buy</button>) : (<h2 className="sold-text" style={{color: "red"}}>Sold Out!</h2>)}
                    </div>
                    {error && (
                        <p className="error-messages">{error.message}</p>
                    )}
                </div>
            ))}
        </section>
    );
};

export default AllOffersList;