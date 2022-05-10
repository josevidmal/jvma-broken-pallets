import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const MyPurchasesList = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const me = data?.me || {};
    
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
        <section>
            <h2>My Purchases</h2>
            {me.myPurchases?.map((myPurchase) => {
                return (
                    <div key={myPurchase._id}>
                        <h4>Order ID: {myPurchase._id}</h4>
                        <ul>
                            <li>Seller: {myPurchase.seller}</li>
                            <li>Pallets: {myPurchase.palletQty}</li>
                            <li>Price: ${myPurchase.price} MXN</li>
                            <li>Material: {myPurchase.material}</li>
                            <li>Dimension: {myPurchase.dimension}</li>
                            <li>Address: {myPurchase.address}</li>
                            <li>State: {myPurchase.state}</li>
                            <li>Status: {myPurchase.offerStatus}</li>
                        </ul>
                        <img src={require(`../../assets/images/${myPurchase.image}`)} alt='damaged-pallets' />
                    </div>
                );
            })}
        </section>
    );
};

export default MyPurchasesList;