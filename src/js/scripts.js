//IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=900';
  

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let container = document.querySelector('.row');

    // Create a new column
    let col = document.createElement('div');
    col.classList.add('col-lg-2', 'col-md-3', 'col-sm-6'); // Adjust column classes for responsiveness
    col.classList.add('d-flex'); // Make the column flex container
    col.classList.add('justify-content-center');

    // Create the button
    let button = document.createElement('button');
    button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); 
    button.classList.add("btn", "btn-info", "btn-custom", "mb-2"); // Add button styling classes
    button.style.width = '120px'
    button.style.border = '1px solid #000';

    col.appendChild(button);
    container.appendChild(col);

    // Add event listener to the button
    button.addEventListener('click', function(event) {
        showDetails(pokemon);
    });
  }

  

 
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        // Update modal content with Pokemon details
        document.getElementById('pokemonName').textContent = pokemon.name;
        document.getElementById('pokemonHeight').textContent = 'Height: ' + pokemon.height;

        let typesText = pokemon.types.map(function(type) {
            return type.type.name;
        }).join(', ');
        document.getElementById('pokemonTypes').textContent = 'Types: ' + typesText;

        document.getElementById('pokemonImage').src = pokemon.imageUrl;

        // Show Bootstrap modal
        $('#pokemonModal').modal('show');

        document.querySelector('.modal .close').addEventListener('click', function() {
            $('#pokemonModal').modal('hide');
        });

        $('#pokemonModal').on('click', function(e) {
            if (e.target === document.querySelector('.modal')) {
                $('#pokemonModal').modal('hide');
            }
        });

        // Close modal when escape key is pressed
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                $('#pokemonModal').modal('hide');
            }
        });
    });
}


  

function loadList() {
      return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (pocketMonster) {
        let pokemon = {
          name: pocketMonster.name,
          height: pocketMonster.height,
          detailsUrl: pocketMonster.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types; // Add types to the Pokémon object
      })
      .catch(function(e) {
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

// forEach loop 
  pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
})




















