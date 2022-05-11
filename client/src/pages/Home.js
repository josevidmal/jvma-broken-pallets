import React from 'react';
import CircularEconomy from '../assets/images/circular-economy.webp'

const Home = () => {
    return (
        <section id="about-section">
            <p>
                Welcome to Broken Pallets, the web application where companies can offer their damaged 
                plastic pallets to recyclers, at a residual price of their original value. All with the 
                purpose of making some profit, while at the same time mitigate the incorrect disposal of 
                plastic pallets, which can have a very negative impact on the environment. In this way 
                Broken Pallets helps companies transition towards a Circular Economy culture with 
                sustainable practices, leaving behind the harmful take-make-dispose approach of a
                Linear Economy. 
            </p>
            <img id="home-image" src={CircularEconomy} alt="circular-economy"/>
        </section>
    );
};

export default Home;