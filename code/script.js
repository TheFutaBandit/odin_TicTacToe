function Player(playerName,token) {
    this.playerName = playerName;
    this.token = token;
    return {playerName,token};
}

function Gameboard() {
    const rows = 3;
    const columns = 3;

    const Board = [];

    for(let i = 0; i < rows; i++) {
        Board.push([]);
        for(let j = 0; j < columns; j++) {
            Board[i].push(Cell());
        }
    }

    function PrintBoard(Board) {
        Board.map((row) => {
            row.map((cell) => {
                console.log(cell);
            })
            console.log(`\n`);
        })
    }

    PrintBoard(Board);

    return {
        Board,
        PrintBoard
    };
}

function Cell() {
    return 5;
}

const k = Gameboard();

