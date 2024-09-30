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

// Initial pieces setup with pawns
let pieces = {
    '1,0': '♙', '1,1': '♙', '1,2': '♙', '1,3': '♙', '1,4': '♙', '1,5': '♙', '1,6': '♙', '1,7': '♙',
    '6,0': '♟', '6,1': '♟', '6,2': '♟', '6,3': '♟', '6,4': '♟', '6,5': '♟', '6,6': '♟', '6,7': '♟'
};

// Draw pieces on the board
const drawPieces = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        const row = square.dataset.row;
        const col = square.dataset.col;
        square.textContent = pieces[`${row},${col}`] || '';
    });
};

// Handle square clicks
let selectedSquare = null;

const handleSquareClick = (row, col) => {
    const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (selectedSquare) {
        const prevRow = selectedSquare.dataset.row;
        const prevCol = selectedSquare.dataset.col;
        
        // Move piece if valid
        if (movePiece(prevRow, prevCol, row, col)) {
            selectedSquare = null; // Clear selection
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

// Move piece logic for pawns
const movePiece = (fromRow, fromCol, toRow, toCol) => {
    const piece = pieces[`${fromRow},${fromCol}`];
    const direction = piece === '♙' ? 1 : -1; // White moves up, black moves down
    const startRow = piece === '♙' ? 1 : 6; // Starting row for pawns

    // Normal move
    if (toCol === fromCol && toRow === parseInt(fromRow) + direction && !pieces[`${toRow},${toCol}`]) {
        pieces[`${toRow},${toCol}`] = piece; // Move piece
        delete pieces[`${fromRow},${fromCol}`]; // Remove from old position
        return checkPromotion(toRow, toCol, piece);
    }
    
    // Double move from starting position
    if (toCol === fromCol && toRow === parseInt(fromRow) + direction * 2 && fromRow === startRow && !pieces[`${toRow},${toCol}`] && !pieces[`${parseInt(fromRow) + direction},${toCol}`]) {
        pieces[`${toRow},${toCol}`] = piece; // Move piece
        delete pieces[`${fromRow},${fromCol}`];
        return true;
    }

    // Capture move
    if (Math.abs(toCol - fromCol) === 1 && toRow === parseInt(fromRow) + direction && pieces[`${toRow},${toCol}`] && pieces[`${toRow},${toCol}`] !== piece) {
        pieces[`${toRow},${toCol}`] = piece; // Move piece
        delete pieces[`${fromRow},${fromCol}`];
        return checkPromotion(toRow, toCol, piece);
    }

    return false; // Invalid move
};

// Check for pawn promotion
const checkPromotion = (row, col, piece) => {
    if ((piece === '♙' && row === 7) || (piece === '♟' && row === 0)) {
        const promotionPiece = prompt("Promote to (Q, R, B, N):").toUpperCase();
        if (['Q', 'R', 'B', 'N'].includes(promotionPiece)) {
            pieces[`${row},${col}`] = piece === '♙' ? '♛' : '♕'; // Promote to queen
        }
    }
    return true;
};

setupBoard();
drawPieces();
