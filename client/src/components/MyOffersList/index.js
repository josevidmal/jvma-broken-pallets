import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { REMOVE_OFFER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const MyOffersList = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const me = data?.me || {};
    const [removeOffer] = useMutation(REMOVE_OFFER);
    console.log(me);

    const handleDeleteOffer = async (offerId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeOffer({
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
    } if (Auth.getProfile().data.userType !== 'Seller') {
        return (
            <h3>Content available only for Sellers</h3>
        )
    }

    return (
        <section>
            <h2>My Offers</h2>
            {me.myOffers?.map((myOffer) => {
                return (
                    <div key={myOffer._id}>
                        <h4>Offer ID: {myOffer._id}</h4>
                        <ul>
                            <li>Seller: {myOffer.seller}</li>
                            <li>Email: {myOffer.email}</li>
                            <li>Pallets: {myOffer.palletQty}</li>
                            <li>Price: ${myOffer.price} MXN</li>
                            <li>Material: {myOffer.material}</li>
                            <li>Dimension: {myOffer.dimension}</li>
                            <li>Address: {myOffer.address}</li>
                            <li>State: {myOffer.state}</li>
                            <li>Status: {myOffer.offerStatus}</li>
                            <li>Date Created: {myOffer.dateCreated}</li>
                        </ul>
                        <img src={require(`../../assets/images/${myOffer.image}`)} alt='damaged-pallets'/>
                        <button onClick={() => handleDeleteOffer(myOffer._id)}>Delete</button>
                    </div>
                );
            })}
        </section>
    );
};

export default MyOffersList;