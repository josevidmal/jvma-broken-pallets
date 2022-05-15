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
        <section id="myOffers-section" className="offers-sections">
            <h2 className="section-headings">My Offers</h2>
            {me.myOffers?.map((myOffer) => (
                    <div className="section-cards offer-cards" key={myOffer._id}>
                        <h4 className="offer-ids">Offer ID: {myOffer._id}</h4>
                        <ul className="offer-lists">
                            <li className="cards-list-items">Seller: {myOffer.seller}</li>
                            <li className="cards-list-items">Email: {myOffer.email}</li>
                            <li className="cards-list-items">Pallets: {myOffer.palletQty}</li>
                            <li className="cards-list-items">Price: ${myOffer.price} MXN</li>
                            <li className="cards-list-items">Material: {myOffer.material}</li>
                            <li className="cards-list-items">Dimension: {myOffer.dimension}</li>
                            <li className="cards-list-items">Address: {myOffer.address}</li>
                            <li className="cards-list-items">State: {myOffer.state}</li>
                            {myOffer.offerStatus === 'Active' ? (<li className="cards-list-items">Status: Active</li>) : (<li className="cards-list-items">Status: Purchased By <a href={`mailto:${myOffer.offerStatus}`}>{myOffer.offerStatus}</a></li>)}
                            <li className="cards-list-items">Date Created: {myOffer.dateCreated}</li>
                        </ul>
                        <img className="offer-img" src={require(`../../assets/images/${myOffer.image}`)} alt='damaged-pallets'/>
                        <div className="offer-btn-div">
                            {myOffer.offerStatus === 'Active' ? (<button id="delete-btn" className="btns delete-btns" onClick={() => handleDeleteOffer(myOffer._id)}>Delete</button>) : (<h2 style={{color: "green"}}>Sold!</h2>)}
                        </div>
                    </div>
            ))}
        </section>
    );
};

export default MyOffersList;