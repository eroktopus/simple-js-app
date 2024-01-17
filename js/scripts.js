//IIFE
let pokemonRepository = (function () {
let pokemonList = [
{
  name: ' Bulbasaur',
  height: 7,
  type: [' Poison', ' Grass']
},
{
  name: ' Squirtle', 
  height: 9, 
  type: ' Water'
},
{
  name: ' Charmander', 
  height: 12, 
  type: ' Fire'
},
{
  name: ' Evee', 
  height: 8, 
  type: ' Normal'
},
{
  name: ' Mewtwo', 
  height: 11, 
  type: ' Psychic'
}
];
function add(pokemon) {
pokemonList.push(pokemon);
}
function getAll() {
return pokemonList;
}
// turn pokemon to buttons and print without document. write
function addListItem(pokemon){
  let container = document.querySelector('.pokemon-list');
  let list = document.createElement('li');
  let button = document.createElement('button'); /* create button */
  button.innerText = pokemon.name;
  button.classList.add("pokedex-list");
  container.appendChild(button);
  container.appendChild(list);
  button.addEventListener('click', function (event) {
  console.log(event);
});
}
function showDetails(pokemon) {
   console.log(pokemon.name)
  }

return {
add: add,
getAll: getAll,
addListItem: addListItem,
showDetails: showDetails
}; 
// function addListItem(pokemon)
})(); 

console.log(pokemonRepository.getAll());

// add function
pokemonRepository.add({  name: 'Meowth', 
height: 6, 
type: 'Normal'
});
// forEach loop 
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

// let button = document.querySelector('button');
// button.addEventListener('click', function (event) {
//   console.log(event);
// });

// pokemonList.forEach(function(pokemon) {
//   document.write('Name:' + pokemon.name + '<br>' + 'Height:' + pokemon.height + '<br>' + 'Type:' + pokemon.type + '<br>');
//   if (pokemon.height >10) {
//     document.write ("Wow, that's big!" + '<br>'); 
//   }
// });




// if (pokemon.height >= 10) {
//   document.write("<div>" + "<p>" + "Name: " + pokemon.name+ ", " +  "Type: " + pokemon.type + ", " + 
//   "Height:" + " " + pokemon.height + " - Wow! That is a big pokemon! " + "</p>" + "</div>");
// } else if (pokemon.height) {
//   document.write("<div>" + "<p>" + "Name: " + pokemon.name + ", " +  "Type: " + pokemon.type + ", " + 
//   "Height:" + " " + pokemon.height + "  " + "</p>" + "</div>")
// }





