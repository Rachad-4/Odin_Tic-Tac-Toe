const boardContainer = document.querySelector("#gameboard");
const dialog = document.querySelector("dialog");
const submitBTN = document.querySelector("#play-button");
var assignValue = "X";

const newGame = createBoard();
const playerOne = createPlayer();
const playerTwo = createPlayer();


function createBoard() {
    var gameboard =  [
            ["","",""],
            ["","",""],
            ["","",""]
        ];

    const clear = () => {
        gameboard = [
            ["","",""],
            ["","",""],
            ["","",""]
        ];
        boardContainer.innerHTML = "";
        displayBoard();
        markBoard();
    }    

    const {updateGameboard, checkResult} = gameLogic(gameboard, assignValue);

    return {gameboard, clear, updateGameboard, checkResult};
}

function gameLogic(gameboard) {
    const updateGameboard = (x, y) => {
        gameboard[x][y] = assignValue
    }; 

    const checkResult = () => {
        var winner = assignValue == "X" ? (playerOne.getName() || "Player 1") : (playerTwo.getName() || "Player 2");

        if (gameboard[0][0] == assignValue && gameboard[0][1] == assignValue && gameboard[0][2] == assignValue) {
            alert(`Gameover! ${winner} won!`);
            setTimeout(() => newGame.clear(), 1000); 
        } else if (gameboard[1][0] == assignValue && gameboard[1][1] == assignValue && gameboard[1][2] == assignValue) {
            alert(`Gameover! ${winner} won!`);
            setTimeout(() => newGame.clear(), 1000); 
        } else if (gameboard[2][0] == assignValue && gameboard[2][1] == assignValue && gameboard[2][2] == assignValue) {
            alert(`Gameover! ${winner} won!`);
            setTimeout(() => newGame.clear(), 1000); 
        } else if (gameboard[0][0] == assignValue && gameboard[1][0] == assignValue && gameboard[2][0] == assignValue) {
            alert(`Gameover! ${winner} won!`);
            setTimeout(() => newGame.clear(), 1000); 
        } else if (gameboard[0][1] == assignValue && gameboard[1][1] == assignValue && gameboard[2][1] == assignValue) {
            alert (`Gameover! ${winner} won!`);
            setTimeout(() => newGame.clear(), 1000); 
        } else if (gameboard[0][2] == assignValue && gameboard[1][2] == assignValue && gameboard[2][2] == assignValue) {
            alert (`Gameover! ${winner} won!`);
            setTimeout(() => newGame.clear(), 1000); 
        } else if (gameboard[0][0] == assignValue && gameboard[1][1] == assignValue && gameboard[2][2] == assignValue) {
            alert(`Gameover! ${winner} won!`);
            setTimeout(() => newGame.clear(), 1000); 
        } else if (gameboard[0][2] == assignValue && gameboard[1][1] == assignValue && gameboard[2][0] == assignValue) {
            alert(`Gameover! ${winner} won!`);
            setTimeout(() => newGame.clear(), 1000); 
        }
    }   
    
    return {updateGameboard, checkResult}; 
}

function createPlayer() {
    var playerName = "";
    var wins = 0; 
    
    const increaseWins = () => ++wins;
    const setName = (newName) => playerName = newName; 
    const getName = () => playerName;
    // const setAssignedValue = (newValue) => assignValue = newValue;
    // const getAssignedValue = () => assignValue;

    return {increaseWins, setName, getName};
}

function displayBoard() {
    let j = 0;
    let k = 0;  

    for (let i = 0; i < 9; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "box")
        div.setAttribute("id", `${j}${k++}`);
        if (k > 2) {
            k = 0;
            j++;
        }

        boardContainer.appendChild(div);
    }
}

function markBoard () {
    const square = document.querySelectorAll(".box"); 

    for (let i = 0; i < square.length; i++){
        square[i].addEventListener("click", (event) => {
            square[i].textContent = `${assignValue}`;
            let x = parseInt(square[i].getAttribute("id").substring(0, 1));
            let y = parseInt(square[i].getAttribute("id").substring(1));
            newGame.updateGameboard(x,y);
            newGame.checkResult();
            if (assignValue == "X") assignValue = "O";
            else assignValue = "X";
        });   
    } 
}

submitBTN.addEventListener("click", (e) => {
    e.preventDefault();
    playerOne.setName(document.querySelector("#player-1-name").value);
    playerTwo.setName(document.querySelector("#player-2-name").value); 
    console.log(playerOne.getName());

    
    if (playerOne.getName()) {
        const p1 = document.querySelector("#p1");
        p1.textContent = `${playerOne.getName()} (X)`;
        console.log(playerOne.getName());
    }

    if (playerTwo.getName()) {
        const p2 = document.querySelector("#p2");
        p2.textContent = `${playerTwo.getName()} (O)`;
    }

    dialog.close();
})

function gameIntro() {
    dialog.showModal();
}



displayBoard();
markBoard();





