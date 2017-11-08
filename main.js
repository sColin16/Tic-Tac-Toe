//1 represents X, -1 represents O
var currentPlayer = 1;

//append event listeners to all game squares
var squares = document.getElementsByClassName("square");
for(var i = 0, n = squares.length; i<n; i++){
    squares[i].addEventListener("touchstart", handleTouch);
}

//append event listener to "Play Again" button

document.getElementById("replay").addEventListener("touchend", resetGame);

updateTurn();

var Board = {
    board: [0,0,0,0,0,0,0,0,0],
    
    reset:function(){
        this.board = [0,0,0,0,0,0,0,0,0];
    },
    
    checkFull: function(){
        if(this.board.filter(function(x){return x === 0}).length === 0){
            return true;
        }
    },
    
    checkWinner: function(){
        var horizontalSum = 0;
        var verticalSum = 0;
        var majorDiagonalSum = 0;
        var minorDiagonalSum = 0;
        
        for(var i = 0; i<3; i++){
            horizontalSum = this.board[3*i] + this.board[3*i + 1] + this.board[3*i + 2];
            verticalSum = this.board[i] + this.board[i + 3] + this.board[i + 6];
            
            if(Math.max(Math.abs(horizontalSum), Math.abs(verticalSum)) === 3){
                return true;
            }
        }
        
        majorDiagonalSum = Board.board[0] + Board.board[4] + Board.board[8];
        minorDiagonalSum = Board.board[2] + Board.board[4] + Board.board[6];
        
        if(Math.max(Math.abs(majorDiagonalSum), Math.abs(minorDiagonalSum)) === 3){
            return true;
        }
        
        return false;
    },
    
};

function handleTouch(){
    if(!this.classList.contains("X") && !this.classList.contains("O")){
        appendLabel(this);
    }
}

function appendLabel(square){
    var player = (currentPlayer === 1) ? "X" : "O";
    
    square.classList.add(player);
    Board.board[square.id] = currentPlayer;
    
    
    if(Board.checkWinner()){
        renderGameOver(currentPlayer);
        return;
    } else if(Board.checkFull()){
        renderGameOver(false);
        return;
    }
    
    currentPlayer *= -1;
    
    updateTurn();
}

function giveDirection(text){
    var directions = document.getElementById("Directions");
    
    directions.innerText = text;
}

function updateTurn(){
    var turnText = (currentPlayer === 1) ? "X's Turn" : "O's Turn";
    
   giveDirection(turnText);
}

//winner is false is a draw, or the number 1 or -1
function renderGameOver(winner){
    if(!winner){
        giveDirection("It's a draw!");
    } else{
        var player = (winner === 1) ? "X" : "O";
        giveDirection(player + " Wins!");
    }
    
    //reveal game cover, and button
    document.getElementById("gameCover").style.display = "block";
}

function resetSquares(){
    var squares = document.getElementsByClassName("square");
    
    for(var i = 0, n = squares.length; i<n; i++){
        squares[i].className = "square";
    }
}

function resetGame(){
    Board.reset();
    resetSquares();
    
    updateTurn();
    
    document.getElementById("gameCover").style.display = "none";
    
    currentPlayer = 1;
}