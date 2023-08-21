//--------------------------------------------------------------------
// SCROLLING BUTTONS (unique to home page)

//Showing buttons in function of window size
//Resize checker
var intFrameHeight = window.innerHeight;
var PageHeight = document.body.scrollHeight;

//Buttons creation:
topButton = document.getElementById("topBtn");
downButton = document.getElementById("dwnBtn");

//Function to go back to top
function topFunction() {
    document.documentElement.scrollTop = 0;
    }

//Function to go to the bottom
function downFunction() {
    document.documentElement.scrollTo(0, document.body.scrollHeight);
}

//Function with which we check the page position and show the button correspondingly
function scrollFunction() {
    if (document.documentElement.scrollTop > 80) {
        topButton.style.display = "block";
        downButton.style.display = "none";
    } else {
        topButton.style.display = "none";
        // console.log("window:" + intFrameHeight);
        // console.log("page:" + PageHeight);
        if (intFrameHeight < (PageHeight - 50))
        {

            // console.log("window:" + intFrameHeight);
            // console.log("page:" + PageHeight);
            downButton.style.display = "block";
        }
        else{
            downButton.style.display = "none";
        }
    }
}


//init the function
window.onload = function() {scrollFunction()};
//dynamical call
window.onscroll = function() {scrollFunction()};

//Choose if the buttons are shown as a function of the screensize
window.addEventListener('resize', function() {
    intFrameHeight = window.innerHeight;
    PageHeight = document.body.scrollHeight;        
    //this to hide or show the button without scrolling after a resize
    scrollFunction();
});