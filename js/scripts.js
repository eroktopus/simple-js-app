// let pokemonRepository = (function () {
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
  //   return {
  //     add: function(pokemon) {
  //       pokemonList.push(pokemon);
  //     },
  //     getAll: function() {
  //       return pokemonList;
  //     }
  //   };
  // })(); 
pokemonList.forEach(function(pokemon) {
  document.write('Name:' + pokemon.name + '<br>' + 'Height:' + pokemon.height + '<br>' + 'Type:' + pokemon.type + '<br>');
  if (pokemon.height >10) {
    document.write ("Wow, that's big!" + '<br>'); 
  }
});









// let pokemonList=[
//     {name: 'Bulbasaur', height: 7, type: ['poison', 'grass']},
//     {name: 'Squirtle', height: 9, type: 'water'},
//     {name: 'Charmander', height: 12, type: 'fire'},
//     {name: 'Evee', height: 8, type: 'normal'},
//       ];



//       for (let i = 0; i < pokemonList.length; i++) 
// {
//     document.write('<p ' + pokemonList[i].name + '</p>' +
//                    'Name: ' + pokemonList[i].name + '<br>' +
//                    'Height: ' + pokemonList[i].height + '<br>' +
//                    'Type: ' + pokemonList[i].type + '<br>');
                  //  if (pokemonList[i].height >10) {
                  //   document.write ("Wow, that's big!"); 
                  // }
// }


