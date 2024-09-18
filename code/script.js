function player(playerName, token) {
    return {
        playerName,
        token
    }
}

function Gameboard() {
    const rows = 3;
    const columns = 3;

    let board = [];

    for(let i = 0; i < rows; i++) {
        board.push([]);
        for(let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    // const printBoard = () => {
    //     board.map((row) => {
    //         row.map((cell) => {
    //             console.log(`${cell.getValue()}\t`);
    //         })
    //     })
    // }

    const printBoard = () => {
        for (let i = 0; i < board.length; i++) {
            let row = [];
            for (let j = 0; j < board[0].length; j++) {
                row.push(board[i][j].getValue()); // Collect row values
            }
            console.log(`[${i}] ${row.join(' ')}`); // Add unique row index to each log
        }
    }
    
    
    

    const getBoard = () => {
        return board;
    }

    return {
        printBoard,
        getBoard
    }
}

function cell() {
    let value = "";
    let playerHit = {};

    const putValue = (player) => {
        // console.log("hey")
        value = player.token;
        playerHit = player;
    }

    const getValue = () => {
        return value;
    }

    return {
        putValue,
        getValue
    }
}

function Gameflow(playerName1 = "Player1", playerName2 = "Player2") {
    player_1 = player(playerName1,"X");
    player_2 = player(playerName2,"O");

    let players = [player_1,player_2];

    let board = Gameboard();

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    }

    const getActivePlayer = () => {
        return activePlayer;
    }

    const askTurn = (player) => {
        console.log(`It's ${player.playerName}'s turn!`);
    }

    function winningCondition(currentBoard,currentPlayer) {
        const token = currentPlayer.token;

        function arrayChecker(array) {
            return array.every((item) => item.getValue() === currentPlayer.token);
        }
        
        const rowChecker = () => {
            let boolArray = currentBoard.map((row) => arrayChecker(row));
            let checkRow = boolArray.some(value => value === true);
            return checkRow;
        }

        const columnChecker = () => {
            let boolArray = [];
            for(let i = 0; i < currentBoard[0].length; i++) {
                let columnArray = currentBoard.map((row) => row[i]);
                boolArray.push(arrayChecker(columnArray));
            }
            let checkRow = boolArray.some(value => value === true);
            return checkRow;
        }

        const diagonalChecker = () => {
            let diagonalArray = [];
            let antiDiagonalArray = [];
            for(let i = 0; i < currentBoard.length; i++) {
                diagonalArray.push(currentBoard[i][i]);
                antiDiagonalArray.push(currentBoard[i][2-i]);
            }
            const boolArray = [arrayChecker(diagonalArray),arrayChecker(antiDiagonalArray)];
            let checkRow = boolArray.some(value => value === true);
            return checkRow;
        }

        return (rowChecker() || columnChecker() || diagonalChecker());
    }

    const roundCounter = (() => {
        let counter = 0;

        let incrementCounter = () => {
            counter++;
        }

        let resetCounter = () => {
            counter = 0;
        }

        let checkCounter = () => {
            return counter;
        }

        return {
            incrementCounter,
            resetCounter,
            checkCounter
        }
    })();

    const gameStatus = (() => {
        let status = "ongoing";

        function winStatus() {
            status = "win";
        }

        function drawStatus() {
            status = "draw";
        }

        function getStatus() {
            return status;
        }

        return {
            winStatus,
            drawStatus,
            getStatus
        }
    })();

    function drawCondition() {
        if(roundCounter.checkCounter() == (8)) {
            return true;
        }
        else return false;
    }


    function playRound(row, column) {
        // askTurn(activePlayer);
        // board.printBoard();

        // let row = +(prompt("enter the row you want to enter"));
        // let column = +(prompt("enter the column you want to enter"));

        let currentBoard = board.getBoard(); 

        // if(row == 9 || column == 9) return;

        let selectedCell = currentBoard[row][column];

        if(selectedCell.getValue() != "") {
            console.log(`Wrong Move, Try again Please`);
            playRound();
        }
        else selectedCell.putValue(activePlayer); 

        // currentBoard[0][0].putValue(activePlayer); 
        // currentBoard[1][1].putValue(activePlayer); 
        // currentBoard[2][2].putValue(activePlayer); 

        let winCheck = winningCondition(currentBoard,activePlayer);
        let drawCheck = drawCondition();

        if(winCheck === false && drawCheck === false) {
            roundCounter.incrementCounter();
            switchPlayer();
        }
        else {
            if(winCheck == true) gameStatus.winStatus();
            else gameStatus.drawStatus();
        }       
    }

    return {
        playRound,
        getActivePlayer,
        getCurrentBoard : board.getBoard(),
        gameStatus
    }
}

function screenController() {
    let game = Gameflow("Alex","Steve");
    const turn = document.querySelector(".turn");
    const board = document.querySelector(".board");

    function updateScreen() {
        board.textContent = "";

        turn.textContent = `It's ${game.getActivePlayer().playerName}'s turn right now!`;

        const currentBoard = game.getCurrentBoard;

        const currentStatus = game.gameStatus.getStatus();

        currentBoard.forEach((row,rowNumber) => {
            row.forEach((column, columnNumber) => {
                const cell = document.createElement("button");
                cell.classList.add("cell");
                cell.dataset.row = rowNumber;
                cell.dataset.column = columnNumber;
                cell.textContent = currentBoard[rowNumber][columnNumber].getValue();
                board.appendChild(cell);
            })
        })

        if(currentStatus != "ongoing") {
            if(currentStatus == "win") {
                turn.textContent = `${game.getActivePlayer().playerName} has won!`;
                return;
            }
            else {
                turn.textContent = "It's a draw bro";
                return;
            }
        }
    }

    function cellInput(e) {
        const rowNumber = +(e.target.dataset.row);
        const columnNumber = +(e.target.dataset.column);
        console.log(rowNumber,columnNumber);
        if(game.gameStatus.getStatus()!="ongoing") return;
        if(game.getCurrentBoard[rowNumber][columnNumber].getValue() === "") {
            game.playRound(rowNumber,columnNumber);
            updateScreen();
        }
    }

    board.addEventListener("click", cellInput);

    updateScreen();

}

const resetButton = (() => {
    const reset = document.querySelector(".reset-button");
    reset.addEventListener("click", () => {
        screenController();
    })
})();



screenController();





