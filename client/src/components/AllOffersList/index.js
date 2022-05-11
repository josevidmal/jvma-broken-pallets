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
        <section>
            <h2>All Offers</h2>
            {offers.map((offer) => (
                <div key={offer._id}>
                    <h4>Offer ID: {offer._id}</h4>
                    <ul>
                        <li>Seller: {offer.seller}</li>
                        <li>Email: {offer.email}</li>
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
                    <button onClick={() => handleSaveOffer(offer._id)}>Buy</button>
                    {error && (
                        <p>{error.message}</p>
                    )}
                </div>
            ))}
        </section>
    );
};

export default AllOffersList;