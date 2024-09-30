const chessboard = document.getElementById('chessboard');

// Initialize the chessboard
const setupBoard = () => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.classList.add('square', (i + j) % 2 === 0 ? 'white' : 'black');
            square.dataset.row = i;
            square.dataset.col = j;

            // Add click event for piece movement
            square.addEventListener('click', () => handleSquareClick(i, j));
            chessboard.appendChild(square);
        }
    }
};

// Pieces setup (using simple text representation)
let pieces = {
    '0,0': '♖', '0,1': '♘', '0,2': '♗', '0,3': '♕', '0,4': '♔', '0,5': '♗', '0,6': '♘', '0,7': '♖',
    '1,0': '♙', '1,1': '♙', '1,2': '♙', '1,3': '♙', '1,4': '♙', '1,5': '♙', '1,6': '♙', '1,7': '♙',
    '7,0': '♜', '7,1': '♞', '7,2': '♝', '7,3': '♛', '7,4': '♚', '7,5': '♝', '7,6': '♞', '7,7': '♜',
    '6,0': '♟', '6,1': '♟', '6,2': '♟', '6,3': '♟', '6,4': '♟', '6,5': '♟', '6,6': '♟', '6,7': '♟'
};

// Draw pieces on the board
const drawPieces = () => {
    for (let position in pieces) {
        const [row, col] = position.split(',').map(Number);
        const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        square.textContent = pieces[position];
    }
};

// Handle square clicks
let selectedSquare = null;

const handleSquareClick = (row, col) => {
    const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (selectedSquare) {
        const prevSquare = selectedSquare;
        // Move piece if valid
        if (movePiece(prevSquare, square)) {
            // Clear previous selection
            selectedSquare.textContent = '';
            selectedSquare = null;
            drawPieces();
        } else {
            selectedSquare = null; // Deselect if invalid move
        }
    } else {
        // Select square
        if (square.textContent) {
            selectedSquare = square;
        }
    }
};

// Move piece logic (simple for demonstration)
const movePiece = (fromSquare, toSquare) => {
    const fromRow = fromSquare.dataset.row;
    const fromCol = fromSquare.dataset.col;
    const toRow = toSquare.dataset.row;
    const toCol = toSquare.dataset.col;

    // Example: allow any move for now
    const piece = pieces[`${fromRow},${fromCol}`];
    if (piece) {
        pieces[`${toRow},${toCol}`] = piece; // Move piece
        delete pieces[`${fromRow},${fromCol}`]; // Remove from old position
        return true;
    }
    return false;
};

setupBoard();
drawPieces();
