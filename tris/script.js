/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* JS with functions specific to the Tris game */

const cells = document.querySelectorAll('.cell');

let turn = 0;

const cellSigns = [];

//Questo ciclo for mi manda ai pazzi perchè è asincrono ed essenzialmente non sta facendo una operazione cells.lenght volte, ma la sa fare per ogni elemento di cells. Non sta scorrendo tra le celle ogni volta che si ripete, ma sa farsi per ognicella da 0 a 8... che matto
for(let i = 0; i < cells.length; i++){
    const cell = cells[i];

    cell.addEventListener('click', function(){
        
        // Already pressed cell
        if(cellSigns[i]){
            return;
        }

        // The turn parity change the symbol which the press will make appear on the cell
        turn++;
        let sign;
        if(turn%2===0){
            sign = 'O';
        }else{
            sign = 'X';
        }
        cell.innerText = sign;
        
        cellSigns[i] = sign;

        // Check wether the player won or not
        let hasWon = checkVictory();

        if(hasWon){
            showAlert(`${sign}s won!`)
        }else if(turn == 9){
            showAlert(`It's a draw!`)
        }

    })
}

function checkVictory(){
    // As tris is a simple game no need for logic to find if a solution has won: just wrote all the possibilities
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 3, 6],
    ];

    for(let i = 0; i < winningCombination.length; i++){
        const combination = winningCombination[i];

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        //Check if won or not
        if(cellSigns[a] && cellSigns[a] === cellSigns[b] && cellSigns[b] === cellSigns[c]){
            return true;
        }

    }

    return false;
}