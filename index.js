const boardContainer = document.querySelector("#gameboard");
const dialog = document.querySelector("#intro");
const firstTie = document.querySelector("#tie-game");
const won = document.querySelector("#winner");
const loss = document.querySelector("#loss");
const submitBTN = document.querySelector("#play-button");
const jiggaWins = document.querySelector("#jigga");

var assignValue = "X";
let turns = 0; 
let ties = 0;
let firstTieGame = true;

const newGame = createBoard();
const playerOne = createPlayer();
const playerTwo = createPlayer();


function createBoard() {

    var gameboard =  [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
       

    const {updateGameboard, checkResult, updateScore, clearBoard} = gameLogic(gameboard, assignValue);

    return {updateGameboard, checkResult, updateScore, clearBoard};
}

function gameLogic(gameboard) {
    const updateGameboard = (x, y) => {
        gameboard[x][y] = assignValue;
        ++turns;
    }; 

    const clearBoard = () => {
        let j = 0;
        let k = 0;  

        for (let i = 0; i < 9; i++) {
            gameboard[j][k++] = "";
            if (k > 2) {
            k = 0;
            j++;
            }
        }
        boardContainer.innerHTML = "";
        displayBoard();
        markBoard();
    }

    const updateScore = (winner) => {

        if (winner == playerOne.getName() || winner == "Player 1") {
            const p1_score = document.querySelector("#p1-score");
            animateWinner("#p1");
            p1_score.textContent = `${playerOne.getWins()}`;
        }

        if (winner == playerTwo.getName() || winner == "Player 2") {
            const p2_score = document.querySelector("#p2-score");
            animateWinner("#p2");
            p2_score.textContent = `${playerTwo.getWins()}`;
        }

        if (winner == "Jigsaw") {
            const div = document.createElement("div");
            const jigsaw = img_create("images/Jigsaw icon.png", "Picture of Jigsaw's face");
            
            jigsaw.setAttribute("id", "icon");
            div.appendChild(jigsaw);
            jiggaWins.appendChild(div);
        }
    }

    const endGame = (winner) => {
        // setTimeout(() => alert(`Round over! ${winner} won!`), 300);
        setTimeout(() => newGame.clearBoard(), 1000); 
        if (winner != "Jigsaw") {
            if (assignValue =="X") playerOne.increaseWins();
            else playerTwo.increaseWins();
        }
        newGame.updateScore(winner);
        turns = 0;
        outro();
    }    

    const checkResult = () => {


        var winner = assignValue == "X" ? (playerOne.getName() || "Player 1") : (playerTwo.getName() || "Player 2");

        if (gameboard[0][0] == assignValue && gameboard[0][1] == assignValue && gameboard[0][2] == assignValue) {
            endGame(winner);
        } else if (gameboard[1][0] == assignValue && gameboard[1][1] == assignValue && gameboard[1][2] == assignValue) {
            endGame(winner);
        } else if (gameboard[2][0] == assignValue && gameboard[2][1] == assignValue && gameboard[2][2] == assignValue) {
            endGame(winner);
        } else if (gameboard[0][0] == assignValue && gameboard[1][0] == assignValue && gameboard[2][0] == assignValue) {
            endGame(winner);
        } else if (gameboard[0][1] == assignValue && gameboard[1][1] == assignValue && gameboard[2][1] == assignValue) {
            endGame(winner);
        } else if (gameboard[0][2] == assignValue && gameboard[1][2] == assignValue && gameboard[2][2] == assignValue) {
            endGame(winner);
        } else if (gameboard[0][0] == assignValue && gameboard[1][1] == assignValue && gameboard[2][2] == assignValue) {
            endGame(winner);
        } else if (gameboard[0][2] == assignValue && gameboard[1][1] == assignValue && gameboard[2][0] == assignValue) {
            endGame(winner);
        } else if (turns == 9){
            ties++;
            winner = "Jigsaw"; 
            endGame(winner);
        }
    }   

    const {getWins} = createPlayer();
    
    return {updateGameboard, checkResult, getWins, updateScore, clearBoard}; 
}

function createPlayer() {
    var playerName = "";
    var wins = 0; 
    
    const increaseWins = () => ++wins;
    const getWins = () => wins;
    const setName = (newName) => playerName = newName; 
    const getName = () => playerName;
    // const setAssignedValue = (newValue) => assignValue = newValue;
    // const getAssignedValue = () => assignValue;

    return {increaseWins, setName, getName, getWins};
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

    if (ties == 1 && firstTieGame == true){
        firstTieGame = false; 
        var laugh = new Audio("sounds/Jigsaw i want to play the game - Converted with FlexClip-[AudioTrimmer.com].mp3");
        laugh.play();
        firstTie.showModal("");

        document.addEventListener("click", () => {
            firstTie.close();
        });
    }

    const square = document.querySelectorAll(".box"); 

    for (let i = 0; i < square.length; i++){
        square[i].addEventListener("click", (event) => {
            if (!square[i].textContent) {
                square[i].textContent = `${assignValue}`;
                let x = parseInt(square[i].getAttribute("id").substring(0, 1));
                let y = parseInt(square[i].getAttribute("id").substring(1));
                newGame.updateGameboard(x,y);
                newGame.checkResult();
                if (assignValue == "X") assignValue = "O";
                else assignValue = "X";
                getCurrentPlayer(); 
            }
        });   
    } 
}

submitBTN.addEventListener("click", (e) => {
    e.preventDefault();
    playerOne.setName(document.querySelector("#player-1-name").value);
    playerTwo.setName(document.querySelector("#player-2-name").value); 

    
    if (playerOne.getName()) {
        const p1 = document.querySelector("#p1");
        p1.textContent = `${playerOne.getName()}`;
        console.log(playerOne.getName());
    }

    if (playerTwo.getName()) {
        const p2 = document.querySelector("#p2");
        p2.textContent = `${playerTwo.getName()}`;
    }

    getCurrentPlayer();
    dialog.close();
})

function img_create(src, alt) {
    var img = document.createElement('img');
    img.src = src;
    if ( alt != null ) img.alt = alt;
    return img;
}

function getCurrentPlayer() {
    const currentPlayer = document.querySelector("#current-player");

    if (assignValue == "X") currentPlayer.textContent = `${playerOne.getName()}` || "Player 1";
    else currentPlayer.textContent = `${playerTwo.getName()}` || "Player 2";
}

function outro(){
    var winner = assignValue == "O" ? `${playerTwo.getName()}` || "Player 2" : `${playerOne.getName()}` || "Player 1";
    var loser = assignValue == "X" ? `${playerOne.getName()}` || "Player 1" : `${playerTwo.getName()}` || "Player 2";

    if (playerOne.getWins() == 3 || playerTwo.getWins() == 3 || document.querySelectorAll("#icon").length == 3) {
        const wonGame = document.querySelector("#winning-player");
        const lostGame = document.querySelector("#losing-player");
        wonGame.textContent = `${winner}`; 

        won.showModal(""); 
        won.addEventListener("click", () => {
            won.close();
        });

    }
}

function animateWinner(player) {
    const p1 = document.querySelector(player);
    var heatbeat = new Audio("sounds/fast-heartbeat-[AudioTrimmer.com].mp3")
    heatbeat.play();
    p1.classList.toggle("winner");
    setTimeout(() => {p1.classList.toggle("winner");}, 300);
    setTimeout(() => {p1.classList.toggle("winner");}, 700);
    setTimeout(() => {p1.classList.toggle("winner");}, 900);
}

function gameIntro() {
    dialog.showModal();
    var audio = new Audio("sounds/Jigsaw i want to play the game - Converted with FlexClip.mp3");
    audio.play();
}



displayBoard();
markBoard();