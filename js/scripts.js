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

  function addListItem(pokemon) {
    let container = document.querySelector('.list-group');

    // Check if the number of existing columns is divisible by 4 to determine if a new row is needed
    let existingColumns = container.querySelectorAll('.row .col-md-2');
    if (existingColumns.length % 6 === 0) {
        // If the number of existing columns is divisible by 4, create a new row
        var row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
    } else {
        // If not, get the last row
        var row = container.lastChild;
    }

    // Create a new column
    let col = document.createElement('div');
    col.classList.add('col-md-2'); // Each column will take up 3 units of space in medium-sized screens to fit 4 columns in a row
    col.classList.add('d-flex'); // Make the column flex container
    col.classList.add('justify-content-center'); 

    // Create the button
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("btn-primary"); // Add your button styling classes here
    button.classList.add("btn-custom"); // Add custom button class

    
    col.appendChild(button);
    row.appendChild(col);

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




