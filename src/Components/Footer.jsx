import React from 'react';
import logo from '../img/logo.png';
import '../Styles/Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
        <img className='footer-logo' src={logo} alt='logo-footer'/>
        <ul className='footer-info'>
            <li>Daniel Alfonzo Martinez Payan</li>
            <li>Aprendíz SENA - 4to trimestre</li>
            <li>Palmira, Valle del Cauca</li>
        </ul>
    </footer>
  )
}

export default Footer