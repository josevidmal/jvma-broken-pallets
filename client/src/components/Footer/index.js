import React from 'react';
import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <h4>Developed By:<br></br>José Vidal Maza Alonso<br></br>Full Stack Web Developer</h4>
            <ul>
                <li><a className="footer-links" href="https://github.com/josevidmal"><FaGithub /></a></li>
                <li><a className="footer-links" href="https://www.linkedin.com/in/jose-vidal-maza-alonso-73477646/"><FaLinkedin /></a></li>
                <li><a className="footer-links" href="https://stackoverflow.com/users/17156054/jos%c3%a9-vidal"><FaStackOverflow /></a></li>
            </ul>
        </footer>
    )
}

export default Footer;