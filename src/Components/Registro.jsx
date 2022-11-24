import React from "react";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import "./../Styles/Login.css";
import { registerUser } from "../API/API_USERS";
import Cookies from 'universal-cookie';
// import {Link, } from 'react-router-dom';
const cookies = new Cookies();

const Registro = () => {

  const navigate = useNavigate();

  const registFunc = async () => {
    const form = document.querySelector("#registro-pokeapi");
    const nombre = document.querySelector("#name");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    console.log(nombre);
    if(nombre.value.trim() == ""){
      alert("Por favor llena el campo nombre");
    }else if(email.value.trim() == ""){
      alert("Por favor llena el campo correo");
    }else if(password.value.trim() == ""){
      alert("Por favor llena el campo contraseña");
    }else{
      const data = {nombre: nombre.value, 
                    correo: email.value, 
                    password: password.value};
      const result = await registerUser(data);
      console.log(result);
      if(result){
        cookies.set('idUsuario', "200", {path: "/"})
        cookies.set('nombre', data.nombre, {path: "/"})
        cookies.set('correo', data.correo, {path: "/"})
        alert("Registro exitoso");
        
        navigate("/",{state:{logged: true}})
      }else{
        alert("No se pudo registrar");
      }
    }


  };

  return (
    <>
      <section className="login">
        <article className="login-container">
          <form id="registro-pokeapi" className="login-container-form">
            <label>Poke API</label>
            <input
              className="login-container-form-input"
              id="name"
              placeholder="Nombre"
              type="text"
              required
            />
            <input
              className="login-container-form-input"
              id="email"
              placeholder="Email"
              type="email"
              required
            />
            <input
              className="login-container-form-input"
              id="password"
              placeholder="Password"
              type="password"
              required
            />
            <button type="button" className='login-container-form-submit' onClick={registFunc}>
              Registrarse
            </button>
          </form>
          <p>¿Ya tienes cuenta?, <Link className='login-container-redirect' to={'/login'}>Inicia Sesión Aquí.</Link> </p>
          <Link className="login-container-home" to={'/'}>Página principal</Link>
          
        </article>
        <Footer />
      </section>
    </>
  );
};

export default Registro;
