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
    let value = "5";
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

    function playRound() {
        askTurn(activePlayer);
        board.printBoard();

        let move = +(prompt("enter the number you want to enter"));

        // console.log(typeof(move));

        let currentBoard = board.getBoard();

        // console.log(currentBoard[2][2]);

        currentBoard[move][move].putValue(activePlayer);

        // let cellSelected = board[move][move];   

        switchPlayer();

        console.log(currentBoard[move][move].getValue());
    }

    return {
        playRound,
        getActivePlayer
    }
}

let game = Gameflow();
game.playRound();




