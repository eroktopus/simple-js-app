//IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  // turn pokemon to buttons and print without document. write
  function addListItem(pokemon) {
    let container = document.querySelector('.list-group');
    let list = document.createElement('li');
    list.classList.add('list-group-item')
    let button = document.createElement('button'); /* create button */
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("pokedex-list");
    container.appendChild(button);
    container.appendChild(list);
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




















// function showDetails(pokemon) {
//   loadDetails(pokemon).then(function () {
//     let modal = document.createElement('div');
//     modal.classList.add('modal');

//     let content = document.createElement('div');
//     content.classList.add('modal-content');

//     let closeButton = document.createElement('span');
//     closeButton.classList.add('close');
//     closeButton.innerHTML = '&times;';
//     closeButton.addEventListener('click', closeModal);

//     let nameElement = document.createElement('h2');
//     nameElement.textContent = pokemon.name;
//     content.classList.add('pokemon-nomenclature');

//     let heightElement = document.createElement('p');
//     heightElement.textContent = 'Height: ' + pokemon.height;

//     let typesElement = document.createElement('p');
//     let typesText = pokemon.types.map(function(type) {
//       return type.type.name;
//     }).join(', ');
//     typesElement.textContent = 'Type: ' + typesText;

//     let imageElement = document.createElement('img');
//     imageElement.src = pokemon.imageUrl;
//     imageElement.alt = pokemon.name;

//     content.appendChild(closeButton);
//     content.appendChild(nameElement);
//     content.appendChild(heightElement);
//     content.appendChild(typesElement);
//     content.appendChild(imageElement);

//     modal.appendChild(content);
//     document.body.appendChild(modal);

//     // Open modal
//     modal.style.display = 'block';

//     // Close modal when clicking on the close button or outside the modal
//     closeButton.addEventListener('click', closeModal);
//     window.addEventListener('click', function(event) {
//       if (event.target == modal) {
//         closeModal();
//       }
//     });
//     //Close modal with escape key
//     document.addEventListener('keydown', function(event) {
//       if (event.key === 'Escape') {
//         closeModal();
//       }
//     });

//     function closeModal() {
//       modal.style.display = 'none';
//       modal.remove(); // Remove modal from DOM to prevent memory leaks
//     }
//   });
// }




