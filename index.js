const boardContainer = document.querySelector("#gameboard");
const dialog = document.querySelector("dialog");
var assignValue = "O";


function createBoard() {
    var gameboard =  [
            ["","",""],
            ["","",""],
            ["","",""]
        ];

    const clear = () => gameboard = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    const {updateGameboard, checkResult} = gameLogic(gameboard, assignValue);

    return {gameboard, clear, updateGameboard, checkResult};
}

function gameLogic(gameboard,assignValue) {
    const updateGameboard = (x, y) => {
        gameboard[x][y] = assignValue
    }; 

    const checkResult = () => {
        var winner = assignValue == "X" ? "Player 1" : "Player 2";

        if (gameboard[0][0] == assignValue && gameboard[0][1] == assignValue && gameboard[0][2] == assignValue) {
            console.log("alert (`Gameover! ${winner} won!`);");
        } else if (gameboard[0][0] == assignValue && gameboard[1][1] == assignValue && gameboard[2][2] == assignValue) {
            console.log("alert (`Gameover! ${winner} won!`);");
        } else if (gameboard[0][0] == assignValue && gameboard[0][1] == assignValue && gameboard[0][2] == assignValue) {
            console.log("alert (`Gameover! ${winner} won!`);");
        } else if (gameboard[0][1] == assignValue && gameboard[1][1] == assignValue && gameboard[2][1] == assignValue) {
            console.log("alert (`Gameover! ${winner} won!`);");
        } else if (gameboard[0][2] == assignValue && gameboard[1][2] == assignValue && gameboard[2][2] == assignValue) {
            console.log("alert (`Gameover! ${winner} won!`);");
        } else if (gameboard[0][2] == assignValue && gameboard[1][1] == assignValue && gameboard[2][0] == assignValue) {
            console.log("alert (`Gameover! ${winner} won!`);");
        } else if (gameboard[2][0] == assignValue && gameboard[2][1] == assignValue && gameboard[2][2] == assignValue) {
            console.log("alert (`Gameover! ${winner} won!`);");
        }
    }   
    
    return {updateGameboard, checkResult}; 
}

function createPlayer(name, assignValue) {
    var playerName = name;
    var wins = 0; 
    
    const increaseWins = () => ++wins;
    const setName = (newName) => name = newName; 
    const getName = () => playerName;
    const setAssignedValue = (newValue) => assignValue = newValue;
    const getAssignedValue = () => assignValue;

    return {increaseWins, setName, getName, setAssignedValue, getAssignedValue};
}

function displayBoard() {
    for (let i = 0; i < 9; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "box")

        boardContainer.appendChild(div);
    }
}

displayBoard();

document.addEventListener("click",()=>{
    dialog.showModal();
})

const newGame = createBoard();
newGame.updateGameboard(0,0);
newGame.updateGameboard(1,1);
newGame.updateGameboard(2,2);
newGame.checkResult();
console.log(newGame);

