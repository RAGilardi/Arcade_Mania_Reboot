/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* JS with functions specific to the Space Invaders game */

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//INIT
//Generate grid and score display
const grid = document.querySelector('#grid');
const scoreEl = document.querySelector('#score');

const size = 15;
const rxc = size * size;
const cells = [];

// !Can change the speed as wished
const speed = 400;

let score = 0;
scoreEl.innerText = score;

//cell creation
for(let i = 0; i < rxc; i++){
    const cell = document.createElement('div');
    grid.appendChild(cell);
    cells.push(cell);

    //cell.innerText = i; //debug
}

//placing aliens on the screen
const aliens = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
];

const aliensKilled = [];

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//ENDGAME

// Check wether we killed all aliens
function checkForHumanWin(){
    if(aliensKilled.length === aliens.length){
        showAlert('HUMAN WINS!');
        clearInterval(alienMovIntVal);
    }
}


// Check wether the aliens reached the floor
// Could have something more interesting as an effect
function checkForAlienWin(){
    for(let i = 0; i < aliens.length; i++){
        if(
            !aliensKilled.includes(aliens[i]) &&
            aliens[i] >= spaceshipIdx
        ){
            showAlert('ALIEN WINS!');
            clearInterval(alienMovIntVal);           
        }
    }
}


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//ALIENS 

// Add alien (part of movement)
function drawAliens(){
    for(let i = 0; i < aliens.length; i++){
        if(!aliensKilled.includes(i)){
            cells[aliens[i]].classList.add('alien');
        }
    }
}

// Alien deaths
function removeAliens(){
    for(let i = 0; i < aliens.length; i++){
        cells[aliens[i]].classList.remove('alien');
    }    
}

//Alien movement
//variables for the movement specs
let step = 1;
let direction = 'forward' //'backward'
let alienMoveIntVal = null;

function moveAliens(){
    //boolean variables which consider if the first alien reached the end of the screen
    const leftEdge = aliens[0] % size === 0;  // true|false
    const rightEdge = aliens[aliens.length - 1] % size === size - 1;  // true|false

    removeAliens();
    
    if(direction === 'forward' && rightEdge) {
        for(let i = 0; i < aliens.length; i++) {
            // go down one line 
            aliens[i] =  aliens[i] + size + 1;      
            // change direction (both parameter and nominal input for the check)
            step = -1;
            direction = 'backward';
        }
    }

    if(direction === 'backward' && leftEdge) {
        for(let i = 0; i < aliens.length; i++) {
            // go down one line 
            aliens[i] =  aliens[i] + size - 1;      
            // change direction (both parameter and nominal input for the check)
            step = 1;
            direction = 'forward';
        }
    }

    //normal movement
    for(let i = 0; i < aliens.length; i++) {
        aliens[i] = aliens[i] + step;        
    }

    checkForAlienWin();
    drawAliens();

}

// Init the function on load 
drawAliens();
alienMovIntVal = setInterval(moveAliens, speed);

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Spaceship controls

//initial position
let spaceshipIdx = 217;
cells[spaceshipIdx].classList.add('spaceship');

//spaceship movement
function moveSpaceship(event){
    //console.log('move!'); //debug

    const leftEdge = spaceshipIdx % size === 0;
    const rightEdge = spaceshipIdx % size === size - 1;
    
    cells[spaceshipIdx].classList.remove('spaceship');

    if(event.code === 'ArrowLeft' && !leftEdge){
        //move left
        spaceshipIdx --;
    } else if (event.code === 'ArrowRight' && !rightEdge){
        //move right
        spaceshipIdx ++;
    }

    cells[spaceshipIdx].classList.add('spaceship');
}

document.addEventListener('keydown', moveSpaceship);

//Shooting
function shoot(event){
    if(event.code !== 'Space') return;

    //console.log('bang!'); //debug

    let laserIdx = spaceshipIdx;
    let laserIntVal = null;

    //TODO: Altra funzione da splittare (laser e boom)
    function moveLaser(){
        cells[laserIdx].classList.remove('laser');
        laserIdx = laserIdx - size;

        if(laserIdx < 0){
            clearInterval(laserIntVal);
            return;
        }

        //check for shoot
        if(cells[laserIdx].classList.contains('alien')){
 
            //clear the setinterval to avoid errors
            clearInterval(laserIntVal);

            cells[laserIdx].classList.remove('alien', 'laser');
            cells[laserIdx].classList.add('boom');
            setTimeout(function(){
                cells[laserIdx].classList.remove('boom');
            }, 200);

            //save the killed alien id
            const killed = aliens.indexOf(laserIdx);
            aliensKilled.push(killed);

            //TODO: Could make the point related to a timer!
            //Increase the score
            score++;
            scoreEl.innerText = score;

            //check for player win
            checkForHumanWin();

            return;
        }

        cells[laserIdx].classList.add('laser');
    }

    laserIntVal = setInterval(moveLaser, 200);
}

//shooting event listener
document.addEventListener('keydown', shoot);
