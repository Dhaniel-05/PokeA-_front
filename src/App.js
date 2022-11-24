import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import CardPoke from "./Components/CardPoke";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Link, useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';
// import {Link, } from 'react-router-dom';
const cookies = new Cookies();


function App() {
  // const [counter, setCounter] = useState(0);
  
  const [pokemones, setPokemones] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  const [logged, setLogged] = useState(false);
  const [users, setUsers] = useState([]);
  
  
  
  
  const getUsers = async () => {
    const res1 = await fetch("http://localhost:35273/api/usuario");
    const data1 = await res1.json();
    
    setUsers(data1);
  }
  
  const getDataAPI = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    
    setLoadMore(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setPokemones((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
    await console.log(pokemones);
  };
  useEffect(() => {
    
    getDataAPI();
    getUsers();
    
    if(cookies.get('idUsuario')== undefined){
      setLogged(false);
    }else{
      setLogged(true);

    }
    console.log(
      cookies.get('idUsuario')
    )
    console.log(
      cookies.get('nombre')
    )
    console.log(
      cookies.get('correo')
    )
    
  }, []);
  
  const funcLoadMore = () => {
    getDataAPI();
  }
  
  return (
    <div className="App">
      <Header logged={logged} setLogged={setLogged} />
      <section className="pokes">
        {pokemones.map((i, j) => {
          return (
            <Link state={{ i, logged }} className='link' to={`poke/${i.name}`} key={j}>
              <CardPoke key={j} pokeElement={i} />;
            </Link>
          );
        })}
      </section>
      <button className="load-more" onClick={funcLoadMore}>Cargar más!</button>
      {/* <button className="load-more" onClick={getUsers}>Login!</button> */}
      {/* {users.map((i)=>{
        return (
          <p>{i.nombre}</p>
        )
      })} */}
      <Footer />
    </div>
  );
}

export default App;
