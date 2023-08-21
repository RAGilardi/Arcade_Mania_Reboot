/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* JS with functions specific to the Memory game */

//------------------------------------------------
//Init variables
const cards = ['alien', 'bug', 'duck', 'rocket', 'spaceship', 'tiktac'];
const deck = [...cards, ...cards];

const grid = document.querySelector('#grid');

// deck shuffling
deck.sort(function(){
    return 0.5 - Math.random();
});

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Iteration function to fill the board
for(let i = 0; i < deck.length; i++){
    const card = document.createElement('div');
    card.classList.add('card');

    //Name each card with setAttribute
    const cardName = deck[i];    
    card.setAttribute('data-name', cardName);

    //on click I call the flip function
    card.addEventListener('click', flipCard);

    grid.appendChild(card);
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Function with which flip the cards
let pick = [];

function flipCard(event){


    //no overlap with the previously declared card
    const card = event.target;

    if(card.classList.contains('flipped')) return;

    //the flipped class make a card impossible to flip again
    card.classList.add(card.getAttribute('data-name'), 'flipped');

    pick.push(card);
    console.log(pick);

    if(pick.length === 2) {
        //check for match
        checkForMatch();
    }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Check if I have a pair and count errors
let errors = 0;

//Init error number
const errorCounter = document.querySelector('#error');
errorCounter.innerText = errors;

//Check if I found a couple or not
function checkForMatch(){
    const card1 = pick[0];
    const card2 = pick[1];

    const card1Name = card1.getAttribute('data-name');
    const card2Name = card2.getAttribute('data-name');

    if(card1Name == card2Name){
        //Check if I unrevealed all the pairs or not
        checkForWin();

    } else {
        // !the timeout let the player see the second card before flipping again the couple, change it as needed
        setTimeout(function(){
            card1.classList.remove(card1Name, 'flipped');
            card2.classList.remove(card2Name, 'flipped');
            
            //the error count increase is delayed too, as to avoid distracting the player from the cards, before they flip again
            errors++;
            errorCounter.innerText = errors;    
        }, 800);
    }

    pick = [];
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Check wether I won
function checkForWin(){
    const flippedCards = document.querySelectorAll('.flipped');

    if(flippedCards.length == deck.length){
        showAlert('You won!');
    }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//adapting card size as a function of the screen size in the JS, for the whack a bug game I chose to do this all in the CSS
function updateCardSize() {
    var grid = document.getElementsByClassName('card');
    var cardSize = Math.floor(window.innerWidth / 4); // Adjust according to your desired calculation
  
    grid.style.setProperty('--card-size', cardSize + 'px');
}

// Call the function initially to set the card size
updateCardSize();

// Call the function on window resize to update the card size dynamically
window.addEventListener('resize', updateCardSize);