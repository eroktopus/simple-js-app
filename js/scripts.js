//IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  // turn pokemon to buttons and print without document. write
  function addListItem(pokemon) {
    let container = document.querySelector('.pokemon-list');
    let list = document.createElement('li');
    let button = document.createElement('button'); /* create button */
    button.innerText = pokemon.name;
    button.classList.add("pokedex-list");
    container.appendChild(button);
    container.appendChild(list);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
function loadList() {
      return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  };
  // function addListItem(pokemon)
})();

// console.log(pokemonRepository.getAll());

// forEach loop 
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// let button = document.querySelector('button');
// button.addEventListener('click', function (event) {
//   console.log(event);
// });








// {
//   name: ' Bulbasaur',
//   height: 7,
//   type: [' Poison', ' Grass']
// },
// {
//   name: ' Squirtle', 
//   height: 9, 
//   type: ' Water'
// },
// {
//   name: ' Charmander', 
//   height: 12, 
//   type: ' Fire'
// },
// {
//   name: ' Evee', 
//   height: 8, 
//   type: ' Normal'
// },
// {
//   name: ' Mewtwo', 
//   height: 11, 
//   type: ' Psychic'
// }


