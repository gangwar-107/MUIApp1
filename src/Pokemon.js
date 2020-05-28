import React, { useState, useEffect } from 'react';
import { Typography, Link, CircularProgress, Button } from '@material-ui/core';
import { toFirstCharUppercase } from './constants';
import axios from 'axios';

const Pokemon = (props) => {
  const pokemonId = props.match.params.pokemonId;
  const { history } = props;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const { id, name, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Typography variant='h1'>
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} alt='spread' />
        </Typography>
        <img
          style={{ width: '300px', height: '300px' }}
          src={fullImageUrl}
          alt='main'
        />
        <Typography variant='h3'>Pokemon Info</Typography>
        <Typography>
          {'Species: '}
          <Link href={species.url}>{species.name}</Link>
        </Typography>
        <Typography>Height: {height}</Typography>
        <Typography>Weight: {weight}</Typography>
        <Typography variant='h6'>Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name}> {`${name}`} </Typography>;
        })}
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography>Pokemon not found!</Typography>}
      {pokemon !== undefined && (
        <Button variant='contained' onClick={() => history.push('/')}>
          Back to pokedex
        </Button>
      )}
    </>
  );
};

export default Pokemon;
