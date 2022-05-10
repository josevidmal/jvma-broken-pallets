import React from 'react';
import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <h4>Developed By: José Vidal Maza Alonso - Full Stack Developer</h4>
            <ul>
                <li><a href="https://github.com/josevidmal"><FaGithub /></a></li>
                <li><a href="https://www.linkedin.com/in/jose-vidal-maza-alonso-73477646/"><FaLinkedin /></a></li>
                <li><a href="https://stackoverflow.com/users/17156054/jos%c3%a9-vidal"><FaStackOverflow /></a></li>
            </ul>
        </footer>
    )
}

export default Footer;