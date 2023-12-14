let pokemonList=[
    {name: 'Bulbasaur', height: 7, type: ['poison', 'grass']},
    {name: 'Squirtle', height: 9, type: 'water'},
    {name: 'Charmander', height: 12, type: 'fire'},
    {name: 'Evee', height: 8, type: 'normal'},
      ];



      for (let i = 0; i < pokemonList.length; i++) 
{
    document.write('<p ' + pokemonList[i].name + '</p>' +
                   'Name: ' + pokemonList[i].name + '<br>' +
                   'Height: ' + pokemonList[i].height + '<br>' +
                   'Type: ' + pokemonList[i].type + '<br>');
                   if (pokemonList[i].height >10) {
                    document.write ("Wow, that's big!"); 
                  }
  

  //                 for (let i = 0; i < pokemonList.length; i++) 
  // if (pokemonList[i].height >10) {
  //   document.write (pokemonList[i].height + "Wow, that's big!"); 
}






