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
        <section id="myPurchases-section" className="section-cards">
            <h2 className="section-headings">My Purchases</h2>
            {me.myPurchases?.map((myPurchase) => {
                return (
                    <div className="section-cards" key={myPurchase._id}>
                        <h4>Order ID: {myPurchase._id}</h4>
                        <ul>
                            <li>Seller: {myPurchase.seller}</li>
                            <li>Email: {myPurchase.email}</li>
                            <li>Pallets: {myPurchase.palletQty}</li>
                            <li>Price: ${myPurchase.price} MXN</li>
                            <li>Material: {myPurchase.material}</li>
                            <li>Dimension: {myPurchase.dimension}</li>
                            <li>Address: {myPurchase.address}</li>
                            <li>State: {myPurchase.state}</li>
                            <li>Status: {myPurchase.offerStatus}</li>
                        </ul>
                        <img src={require(`../../assets/images/${myPurchase.image}`)} alt='damaged-pallets' />
                        <div>
                            <button className="btns" onClick={() => handleRemovePurchase(myPurchase._id)}>Remove Purchase</button>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default MyPurchasesList;