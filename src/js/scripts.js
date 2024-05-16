// IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let container = document.querySelector(".row");

    // Create a new column
    let col = document.createElement("div");
    col.classList.add(
      "col-lg-2",
      "col-md-3",
      "col-sm-6",
      "d-flex",
      "justify-content-center"
    );

    // Create the button
    let button = document.createElement("button");
    button.classList.add("btn", "btn-info", "btn-custom", "mb-2");
    button.style.width = "200px";
    button.style.border = "1px solid #000";
    button.style.backgroundColor = "#0f2852"; // Set to any color
    button.style.color = "white"; // Set text color to white
    button.style.borderRadius = "10px"; // Round the corners
    button.style.padding = "15px"; // Add some padding
    button.style.marginTop = "15px"; // Add some margin at the top

    // Creating an img element to hold the Pokemon image
    let img = document.createElement("img");
    img.src = pokemon.imageUrl; // Set the source of the image
    img.alt = `Image of ${pokemon.name}`; // Alt text for accessibility
    img.style.width = "50px"; // Set the width of the image
    img.style.height = "auto"; // Maintain aspect ratio
    img.style.marginRight = "10px"; // Add some spacing between the image and the text

    // Adding text next to the image
    let text = document.createTextNode(
      `# ${pokemon.id} ${
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      }`
    );

    // Append the image and text to the button
    button.appendChild(img);
    button.appendChild(text);

    col.appendChild(button);
    container.appendChild(col);

    // Add event listener to the button
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    document.getElementById("pokemonModalHeader").textContent = `#${
      pokemon.id
    } ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
    document.getElementById("pokemonHeight").textContent =
      "Height: " + pokemon.height;
    document.getElementById("pokemonWeight").textContent =
      "Weight: " + pokemon.weight;

    let typesText =
      pokemon.types && pokemon.types.length > 0
        ? pokemon.types
            .map((type) => `${type.charAt(0).toUpperCase()}${type.slice(1)}`)
            .join(", ")
        : "Unknown";

    document.getElementById("pokemonTypes").textContent = "Types: " + typesText;
    document.getElementById("pokemonRegion").textContent =
      "Region: " + (pokemon.region || "Unknown");
    document.getElementById("pokemonImage").src = pokemon.imageUrl;
    document.getElementById("pokemonImage").alt = "Image of " + pokemon.name;

    // Update evolution chain text
    document.getElementById("pokemonEvolutionChain").textContent =
      "Evolution Chain: " + (pokemon.evolutionChain || "No evolution data");

    $("#pokemonModal").modal("show");
  }

  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        let promises = json.results.map((pocketMonster) => {
          let pokemon = {
            name: pocketMonster.name,
            detailsUrl: pocketMonster.url,
          };
          return loadDetails(pokemon).then((detailedPokemon) => {
            add(detailedPokemon);
          });
        });
        return Promise.all(promises);
      })
      .then(() => {
        displayPokemons(); // Move the display logic here after sorting
      })
      .catch((e) => console.error(e));
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        item.id = details.id;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types.map((type) => type.type.name); // Ensure this matches the API structure
        item.imageUrl = details.sprites.other["official-artwork"].front_default;

        return fetch(details.species.url); // Fetch species data
      })
      .then((response) => response.json())
      .then((species) => {
        if (species.evolution_chain) {
          return fetch(species.evolution_chain.url); // Fetch evolution chain data
        } else {
          throw new Error("Evolution chain not found");
        }
      })
      .then((response) => response.json())
      .then((evolutionChain) => {
        item.evolutionChain = parseEvolutionChain(evolutionChain);
        return item; // Ensure item is returned with all details resolved
      })
      .catch((e) => console.error(e));
  }

  function parseEvolutionChain(chain) {
    let evolutions = [];
    let currentStage = chain.chain;

    while (currentStage) {
      let speciesName = currentStage.species.name;
      // Capitalize the first letter of the species name
      let capitalizedSpeciesName =
        speciesName.charAt(0).toUpperCase() + speciesName.slice(1);
      evolutions.push(capitalizedSpeciesName);
      currentStage = currentStage.evolves_to[0]; // Assumes only one path of evolution
    }
    return evolutions.join(" -> ");
  }

  function displayPokemons() {
    let sortedPokemonList = getAll().sort((a, b) => a.id - b.id); // Sort before displaying
    sortedPokemonList.forEach(addListItem);
  }

  function searchPokemon(query) {
    return getAll().filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  document
    .querySelector(".form-inline input[type='search']")
    .addEventListener("input", function (event) {
      let query = event.target.value;
      if (query === "") {
        // If the search field is empty
        document.querySelector(".row").innerHTML = ""; // Clear the current list
        pokemonRepository.getAll().forEach(pokemonRepository.addListItem); // Add all Pokémon to the list again
      } else {
        let searchResults = pokemonRepository.searchPokemon(query);
        document.querySelector(".row").innerHTML = ""; // Clear the current list
        searchResults.forEach(pokemonRepository.addListItem); // Add only the search results
      }
    });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    searchPokemon: searchPokemon,
  };
})();

// Load all data then create list items
pokemonRepository.loadList().then(() => {
  // This is already correct but reaffirming the logic
  console.log("All Pokémon are loaded and displayed in order.");
});
