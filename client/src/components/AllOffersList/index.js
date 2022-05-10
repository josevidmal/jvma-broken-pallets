import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_OFFERS } from '../../utils/queries';
import Auth from '../../utils/auth';

const AllOffersList = () => {
    const { loading, data } = useQuery(QUERY_OFFERS);
    const offers = data?.offers || [];
    console.log(offers);
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
        <section>
            <h2>All Offers</h2>
            {offers.map((offer) => (
                <div key={offer._id}>
                    <h4>Offer ID: {offer._id}</h4>
                    <ul>
                        <li>Seller: {offer.seller}</li>
                        <li>Pallets: {offer.palletQty}</li>
                        <li>Price: ${offer.price} MXN</li>
                        <li>Material: {offer.material}</li>
                        <li>Dimension: {offer.dimension}</li>
                        <li>Address: {offer.address}</li>
                        <li>State: {offer.state}</li>
                        <li>Status: {offer.offerStatus}</li>
                        <li>Date Created: {offer.dateCreated}</li>
                    </ul>
                    <img src={require(`../../assets/images/${offer.image}`)} alt='damaged-plastic-pallets'/>
                    <button>Buy</button>
                </div>
            ))}
        </section>
    );
};

export default AllOffersList;