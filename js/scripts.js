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
}
];
function add(pokemon) {
pokemonList.push(pokemon);
}
function getAll() {
return pokemonList;
}
return {
add: add,
getAll: getAll
}; 
})(); 

console.log(pokemonRepository.getAll());
// add function
pokemonRepository.add({  name: 'Meowth', 
height: 6, 
type: 'Normal'
});
// forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
if (pokemon.height >= 10) {
  document.write("<div>" + "<p>" + "Name: " + pokemon.name+ ", " +  "Type: " + pokemon.type + ", " + 
  "Height:" + " " + pokemon.height + " - Wow! That is a big pokemon! " + "</p>" + "</div>");
} else if (pokemon.height) {
  document.write("<div>" + "<p>" + "Name: " + pokemon.name + ", " +  "Type: " + pokemon.type + ", " + 
  "Height:" + " " + pokemon.height + "  " + "</p>" + "</div>")
}
});


// pokemonList.forEach(function(pokemon) {
//   document.write('Name:' + pokemon.name + '<br>' + 'Height:' + pokemon.height + '<br>' + 'Type:' + pokemon.type + '<br>');
//   if (pokemon.height >10) {
//     document.write ("Wow, that's big!" + '<br>'); 
//   }
// });









