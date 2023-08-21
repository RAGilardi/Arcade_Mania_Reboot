/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* JS with functions specific to the Running duck game */

const road = document.querySelectorAll('#grid > div');
const scoreEl = document.querySelector('#score');

// The duck always stay in the same column (cannot move side to side)
// TODO: might change this and let it move side to side adding two controls
const duckIdx = 1;
const duck = road[duckIdx];
road[duckIdx].classList.add('duck');

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Obstacles (plants) creation and movement
// !Adapt the parameters as you wish to change the game speed
let speed = 200;
let score = 0;


//TODO: Might give the plant to a transition effect, as the duck. To have more fluidity
// Hard part for this would be linked with the overlap of the two sprites (background images)
function addPlant(){
    //add plant
    let currentPlantIdx = road.length - 1;
    road[currentPlantIdx].classList.add('plant');

    //change plant position (movement)
    const plantIntVal = setInterval(function(){
        score++;
        scoreEl.innerText = score;

        //fasten each 50 points
        if(score % 50 === 0){
            speed = speed - 20; //this couldn't make the player go past the 500 points, but it's to hard to reach
            //better solution: speed = speed - speed/10
        }

        road[currentPlantIdx].classList.remove('plant');
        currentPlantIdx--;

        //Recursive function with which to create a new plant when one is gone
        //TODO: could make ti random, and make it possible to have multiple plants on the screen at the same time
        if(currentPlantIdx < 0){
            clearInterval(plantIntVal);
            addPlant();
            return;
        }

        if(
            //the condition to pass is that the duck and plant are on the same column, but different row (duck jumping)
            currentPlantIdx === duckIdx &&
            !road[currentPlantIdx].classList.contains('duck-jump')
        ){
            //loss
            showAlert('Crash!\nGame Over!');
            clearInterval(plantIntVal);
            road[currentPlantIdx].classList.remove('duck');
            road[currentPlantIdx].classList.add('plant');
            return;
        }
    
        road[currentPlantIdx].classList.add('plant');
    }, speed);
}

//Call the function to init at the beginning of game
addPlant();

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Duck jump mechaning
function jump(event){
    //Check if I pressed the Spacebar and doesn't let me jump again until I press it again (keep the key pressed doesn't let you jump repeatedly)
    if(event.code === 'Space' &&
        !event.repeat)
        {
            //the jump is achieved through a div transform function
            //this is stiff, but technically working, would be better with a CSS transition
            duck.classList.add('duck-jump');
            setTimeout(function(){
                duck.classList.remove('duck-jump');
            },300);
        }
}

//The event listener is for every keypress technically, check if spacebar in the jump function
document.addEventListener('keydown', jump)
