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

  function showLoadMessage() { 
    let logocontainer = document.querySelector(".pokemon-list");
    let loadMessage = document.createElement("h4");
    loadMessage.classList.add("load-message");
    loadMessage.innerText = "Loading Data ....";
    logocontainer.appendChild(loadMessage);
  }

function loadList() {
      return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          height: item.height,
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
    loadMessage: loadMessage,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  };

  function showModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let pokeImg = document.createElement('img'); 
    pokeImg.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png';
    pokeImg.classList.add('poke-img');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modalContainer.appendChild(pokeImg);
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  function showDialog(title, text) {
    showModal(title, text);
  
    //modalContainer defined
    let modalContainer = document.querySelector('#modal-container');
  
    //add cancel button to modal
    let modal = modalContainer.querySelector('.modal');
  
    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';
  
    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';
  
    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);
  
    //focus on confirm button so user can just press enter
    confirmButton.focus();
    

    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', hideModal);
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null; // Reset this
        hideModal();
        resolve();
      });
      // This can be used to reject from other functions
      dialogPromiseReject = reject;
    });
  }

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });
  
  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });


  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

})();

// forEach loop 
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


// let img = document.createElement("img"); //create an <img> element 
// img.src = "img/pokemon-8.svg"; 
// img.alt = "image description"; 
// document.body.appendChild(img); 


// (function() {
//   let form = document.querySelector('#register-form');
//   let emailInput = document.querySelector('#email');
//   let passwordInput = document.querySelector('#password');
// function showErrorMessage(input, message) {
//   let container = input.parentElement; // The .input-wrapper

//   // Check and Remove any existing errors
//   let error = container.querySelector('.error-messge');
//   if (error) {
//     container.removeChild(error);
//   }
//   // Now add the error if the message isn't empty
//   if (message){
//     let error = document.createElement('div');
//     error.classList.add('error-message');
//     error.innerText = message;
//     container.appendChild(error);
//   }
// }
// function validateEmail() {
//   let value = emailInput.value;
 
//   if (!value) {
//     showErrorMessage(emailInput, "Email is a required field." );
//     return false;
//   }
//   if (value.indexOf('@')=== -1){
//     showErrorMessage(emailInput, 'You must enter a valid email address.');
//     return false;
//   }
//   if (value.indexOf('.') === -1){
//     showErrorMessage(emailInput, 'You must enter a valid email address.');
//     return false;
//   }

//   showErrorMessage(emailInput, null);
//   return true;
// }

// function validatePassword() {
//   let value = passwordInput.value;
 
//   if (!value) {
//     showErrorMessage(passwordInput, 'Password is a required field.');
//     return false;
//   }
//   if (value.length < 8) {
//     showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
//     return false;
//   }
  
//   showErrorMessage(passwordInput, null);
//   return true;
// }

// function validateForm() {
//   let isValidEmail = validateEmail();
//   let isValidPassword = validatePassword();
//   return isValidEmail && isValidPassword;
// }
// form.addEventListener('submit' , (e) => {
//   e.preventDefault(); //Do not submit to server
//   if (validateForm()) {
//     alert('Success!');
//   }
// })
// emailInput.addEventListener('input', validateEmail);
// passwordInput.addEventListener('input', validatePassword);

// // THE RETURN STATEMENT HERE
// })();

