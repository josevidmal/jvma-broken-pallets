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
        <section id="allOffers-section">
            <h2 className="section-headings">All Offers</h2>
            {offers.map((offer) => (
                <div className="section-cards offer-cards" key={offer._id}>
                    <h4 className="offer-ids">Offer ID: {offer._id}</h4>
                    <ul className="offer-lists">
                        <li className="cards-list-items">Seller: {offer.seller}</li>
                        <li className="cards-list-items">Email: {offer.email}</li>
                        <li className="cards-list-items">Pallets: {offer.palletQty}</li>
                        <li className="cards-list-items">Price: ${offer.price} MXN</li>
                        <li className="cards-list-items">Material: {offer.material}</li>
                        <li className="cards-list-items">Dimension: {offer.dimension}</li>
                        <li className="cards-list-items">Address: {offer.address}</li>
                        <li className="cards-list-items">State: {offer.state}</li>
                        <li className="cards-list-items">Status: {offer.offerStatus}</li>
                        <li className="cards-list-items">Date Created: {offer.dateCreated}</li>
                    </ul>
                    <img className="offer-img" src={require(`../../assets/images/${offer.image}`)} alt='damaged-plastic-pallets'/>
                    <div className="offer-btn-div">
                        <button id="buy-btn" className="btns" onClick={() => handleSaveOffer(offer._id)}>Buy</button>
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