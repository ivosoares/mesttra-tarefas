const listaTarefasHtml = document.getElementById('pokemons');


const getPokemons = () => {
  const Api = fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
  Api.then((response) => {
    console.log(response);
    return response.json();
  }).then((data) => {
    render(data.results);
  })
}

const render = (pokemons) => {
  pokemons.map((pokemon, index) => {
    listaTarefasHtml.insertAdjacentHTML('beforeend', 
    `
      <li class="pokemon-card">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${index + 1}.gif"/>
        <h3>${pokemon.name}</h3>
      </li>
    `)
  })
}

getPokemons();

