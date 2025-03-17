import './style.css';
import { useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState(null); 
  const [search, setSearch] = useState(''); 

  function loadAPI(pokemonName) {
    if (!pokemonName) return; 

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokémon não encontrado');
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        setPokemon(json);
      })
      .catch(err => {
        console.error(err);
        setPokemon(null); 
      });
  }

  return (
    <div className="container">
      <header>
        <strong>Pokémon API</strong>
      </header>

      {/* Agrupando Input + Botão dentro do container */}
      <div className="search-container">
        <input
          placeholder="Buscar nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => loadAPI(search)}>Carregar</button>
      </div>

      {pokemon && (
        <div className="pokemon-card">
          <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
          <div><strong>Nome:</strong> {pokemon.name}</div>
          <div><strong>Número:</strong> {pokemon.id}</div>
          <div><strong>Peso:</strong> {pokemon.weight / 10}kg</div>
          <div><strong>Altura:</strong> {pokemon.height / 10}m</div>
        </div>
      )}
    </div>
  );
}

export default App;
