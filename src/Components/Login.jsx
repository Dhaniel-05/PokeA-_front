import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Link, useLocation } from "react-router-dom";
import "./../Styles/Login.css";
import { getUsers } from "../API/API_USERS";
import Cookies from 'universal-cookie';
// import {Link, } from 'react-router-dom';
const cookies = new Cookies();


const Login = () => {
  const navigate = useNavigate();

  
 

  const loginFunc = async () => {
    // const form = document.querySelector("#login-pokeapi");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    if(email.value.trim() ==  ""){
      alert("Por favor llena el campo correo");
    }else if(password.value.trim() ==  ""){
      alert("Por favor llena el campo contraseña");
    }else{

      console.log(email.value);
      const users = await getUsers();
      
      
      const user =  users.filter(i=>
        i.correo == email.value && i.password == password.value
        )
        
        console.log("Usuario login");
        console.log(user);
        console.log("Usuario login");
        
        if (user.length == 0) {
          email.value = '';
          password.value = '';
          alert("Al parecer no estás registrado!")
      } else {
        cookies.set('idUsuario', user[0].idUsuario, {path: "/"})
        cookies.set('nombre', user[0].nombre, {path: "/"})
        cookies.set('correo', user[0].correo, {path: "/"})
        console.log(user[0].idUsuario);
        console.log(user[0].nombre);
        console.log(user[0].correo);
        alert("Bienvenido!")
        // navigate("/",{state:{logged: true}})
        navigate('/')
        // ]alert('No tienes cuenta, crea una');
        // return redirect("/registro");
      }
    }
    
    // const formData = new FormData(form);
    // console.log(formData);
  };

  return (
    <>
      <section className="login">
        <article className="login-container">
          <form id="login-pokeapi" className="login-container-form">
            <label>Poke API</label>
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
            <button
              className="login-container-form-submit"
              type="button"
              onClick={loginFunc}
            >
              Iniciar Sesión
            </button>
          </form>
          <p>
            ¿No tienes cuenta?,{" "}
            <Link className="login-container-redirect" to={"/registro"}>
              Registrate Aquí.
            </Link>{" "}
          </p>
          <Link className="login-container-home" to={"/"}>
            Página principal
          </Link>
        </article>
        <Footer />
      </section>
    </>
  );
};

export default Login;
