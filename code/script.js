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
        console.table(board);
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

        return (rowChecker() || columnChecker());
    }

    function playRound() {
        askTurn(activePlayer);
        board.printBoard();

        // let move = +(prompt("enter the number you want to enter"));

        let currentBoard = board.getBoard();

        switchPlayer();  

        currentBoard[0][2].putValue(activePlayer); 
        currentBoard[1][2].putValue(activePlayer); 
        currentBoard[2][2].putValue(activePlayer); 

        let winCheck = winningCondition(currentBoard,activePlayer);

        if(winCheck === false) {
            playRound();
        }
        else {
            console.log(`The Winner is ${activePlayer.playerName}`);
        }

        switchPlayer();        
    }

    return {
        playRound,
        getActivePlayer
    }
}

let game = Gameflow();
game.playRound();




