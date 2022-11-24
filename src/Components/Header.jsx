import React,{useState} from 'react'
import logo from '../img/logo-pokeAPI.png';
import { Link,useNavigate } from "react-router-dom";
import '../Styles/Header.css';
import Cookies from 'universal-cookie';
// import {Link, } from 'react-router-dom';
const cookies = new Cookies();

const Header = (props) => {

  const {logged, setLogged} = props;

  
  const navigate = useNavigate();
  const cerrarSesion = ()=>{

      cookies.remove('idUsuario')
      cookies.remove('nombre')
      cookies.remove('correo')
      navigate('/');
  }

  console.log(logged);
  
  return (
    <header className='header'>
        <img className='header-img' src={logo} alt='logo-pokeApi'/>
        {/* <p className='header-title'>Poke API</p> */}
        {
          (!logged)?

        <div className='header-login'>
          <Link  className='header-login-link header-login-login' to='/login'>Iniciar Sesión</Link>
          <Link className='header-login-link header-login-registro' to='/registro'>Registrase</Link>
          {/* <Link className='header-login-link header-login-cerrar' to='/registro'>Registrase</Link> */}
        </div>
          :
          <button className='header-cerrar' onClick={cerrarSesion}>Cerrar Sesión</button>
          // <span></span>
        }
    </header>
  )
}

export default Header