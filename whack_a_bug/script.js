/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* JS with functions specific to the Whack a Bug game */

//Init 
const scoreDisplay = document.querySelector('#score-display');
let score = 0;
scoreDisplay.innerText = score;

const timerDisplay = document.querySelector('#timer-display');
let timeLeft = 30;
timerDisplay.innerText = timeLeft;

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//BUG logic
const cells = document.querySelectorAll('.cell');

//initial speed
// !Adapt it as you wish
let bugSpeed = 800; //msec

function randomBug(){
    //remove the previous bug before showing the new one
    removeBug();

    //difficulty increase as we eliminate more bugs
    if(score%10==0){
        bugSpeed = bugSpeed - 200;
        // should be impossible to reach a score of 40, but this function could be made safer with something like
        // bugSpeed = bugSpeed - bugSpeed/4;
    }

    //place a new bug
    const randomNumber = Math.floor(Math.random() * cells.length)
    const cell = cells[randomNumber];
    cell.classList.add('bug');    
}

const bugMovement = setInterval(randomBug, bugSpeed);

function removeBug(){
    for (let i = 0; i < cells.length; i++){
        const cellToClean = cells[i];
        cellToClean.classList.remove('bug');
    }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Bug smashing logic
for (let i = 0; i < cells.length; i++){
    const cell = cells[i];
    cell.addEventListener('click', function(){
        //Check if the cell I clicked has a bug
        if(cell.classList.contains('bug')){
            score++;
            scoreDisplay.innerText = score;

            //splat's graphical feedback
            cell.classList.remove('bug');
            cell.classList.add('splat');

            setTimeout(function(){
                cell.classList.remove('splat');
            }, 200);
        }
    })
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Timer logic

const timer = setInterval(countDown,1000); //msec

//countDown function
function countDown(){
    timeLeft--;
    timerDisplay.innerText = timeLeft;

    if(timeLeft == 0){
        clearInterval(timer);

        clearInterval(bugMovement);

        //Clear the board
        removeBug();

        //Show the result and buttons
        showAlert(`Time's up! You whacked ${score} bugs!`);
    }
}