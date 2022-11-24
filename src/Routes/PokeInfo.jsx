import React, { useEffect } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import '../Styles/PokeInfo.css';

import Cookies from 'universal-cookie';
// import {Link, } from 'react-router-dom';
const cookies = new Cookies();

const PokeInfo = () => {
  const location = useLocation();

  
  // cookies.get('idUsuario')
  // cookies.get('nombre')
  // cookies.get('correo')

  const navigate = useNavigate();
  
  let poke = location.state.i;
  let isLogged = location.state.logged;
  // let togglethemechange = location.toggleThemeChange;
  // if(!location.state.logged){
  //   alert("Por favor inicia sesión, para ingresar a esta página")
  //   navigate("/")
  // }

  console.log("isLogged")
  console.log(isLogged)
  console.log("isLogged")
  const validateSession = ()=>{

    if(cookies.get('idUsuario') == undefined){
      alert("Por favor inicia sesión, para ingresar a esta página")
      // navigate ("/")
      navigate("/")
      // return redirect("/")
    }else{

    }
    
  }
  useEffect(()=>{
    validateSession()
  },[])
  
  return (
    <>
      <Header logged={isLogged} />
      <section className="pokeinfo-container">
      <Link className='pokeinfo-back' to={'/'}>Volver</Link>
        <article className="pokeinfo">
          <img
            className="pokeinfo-img"
            src={poke.sprites.other.dream_world.front_default}
            alt="img-poke"
          />
          <div className='pokeinfo-cont'>
            <p className='pokeinfo-name'>{poke.name}</p>
            <p className='pokeinfo-cont-h'>Height <span>{(poke.height / 3.281).toFixed(2)} m ({poke.height} ft)</span></p>
            <p className='pokeinfo-cont-a'>Abilities <span>  </span>
              {poke.abilities.map((i,j) => {
                return <span key={j}>{i.ability.name} </span>;
              })}
            </p>
            <p className='pokeinfo-cont-f'>Forms<span>  </span>
              {poke.forms.map((i,j) => {
                return <span key={j}>{i.name} </span>;
              })}
            </p>
            <p className='pokeinfo-cont-t'>Types<span>  </span>
              {poke.types.map((i,j) => {
                return <span key={j}>{i.type.name}</span>;
              })}
            </p>
            {/* <p>ability: {poke.abilities[0].ability.name}</p>
                <p>ability: {poke.abilities[1].ability.name}</p> */}
          </div>
        </article>
      </section>
      <Footer />
    </>
  );
};

export default PokeInfo;
