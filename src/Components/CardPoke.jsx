import React from "react";
import '../Styles/CardPoke.css';

const CardPoke = (props) => {
  console.log(props);
  const poke = props.pokeElement;

  return (
    <article className="cardpoke">
      <img
        className="cardpoke-img"
        src={poke.sprites.other.dream_world.front_default}
        alt="img-poke"
      />
      <span className='cardpoke-line'></span>
      <div className="cardpoke-info">
        <p> 
          <span>{poke.name}</span>
        </p>
        <ul className='cardpoke-info-list'>
          <li>
            Height: {poke.height}
          </li>
          <li>
            Weight: {poke.weight}
          </li>
          <li>
            Experience: {poke.base_experience}
          </li>
        </ul>
      </div>
    </article>
  );
};
export default CardPoke;
