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

    const printBoard = () => {
        board.map((row) => {
            row.map((cell) => {
                console.log(`${cell.getValue()}\t`);
            })
        })
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
    const value = "";

    const getValue = () => {
        return value;
    }

    return {
        getValue
    }
}

function Gameflow(playerName1 = "Player_1", playerName2 = "Player_2") {
    player_1 = player(playerName1,"X");
    player_2 = player(playerName2,"O");

    let players = [player_1,player_2];

    let board = Gameboard();
}