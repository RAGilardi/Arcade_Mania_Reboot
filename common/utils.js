//--------------------------------------------------------------------
// GAME ALERTS
// This function, common to all games, create the game ending alert and the buttons to replay or go back

function showAlert(message) {
    const gameArea = document.querySelector('.game-area');
    
    const alertMessage = `			
    <div class="game-alert">
        <div class="game-alert-message">
          ${message}
          <button onclick="goBackHome()" id="homeBtn" title="Go back Home">Main menù</button>
        	<button onclick="replayGame()" id="replayBtn" title="Replay the game">Replay</button>
        </div>
    </div>
    `;

    gameArea.innerHTML = gameArea.innerHTML + alertMessage;
}

//--------------------------------------------------------------------
// Functions for the home and replay button

// Go to last page or home
function goBackHome() {
  if (document.referrer) {
      // If there is a referrer, go back to the previous page
      window.history.back();
  } else {
      // If no referrer, navigate to the homepage
      window.location.href = "../index.html";
  }
}

// Function to reload the page (restart the game)
function replayGame() {
  location.reload();
}

//--------------------------------------------------------------------
// DYNAMICALLY CHANGE THE SCREEN ORIENTATION WHEN ITS SIZE CHANGE
// the rest of the dynamic change didn't need to be scripted in the js as in the CSS most of units are in vw/vh units

// Change the game-board orientation when the screen is too tight
function resizeFunction() {
    var flexContainer = document.getElementById('board');

    var screenWidth = window.innerWidth;
    
    if (flexContainer){
      if (screenWidth < 500) {
        flexContainer.style.flexDirection = 'column';
      } else {
          if(flexContainer.style.flexDirection != 'row'){
            // the second if is due to the fact that assigning the container the direction it already has might give error in console
              flexContainer.style.flexDirection = 'row';
              }
      }
    }
  
}

// Call the function on window resize to update the flex container's orientation dynamically
window.addEventListener('resize', resizeFunction);