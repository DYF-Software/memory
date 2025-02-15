let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 7;
let matchedPairs = 0;

document.addEventListener("DOMContentLoaded", () => {
    let gameContainer = document.querySelector(".cards");
    let cards = Array.from(gameContainer.children);
    cards.sort(() => Math.random() - 0.5);
    cards.forEach(card => gameContainer.appendChild(card));
});

function flipCard(card) {
    if (lockBoard || card.classList.contains("flipped") || card === firstCard) return;

    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        setTimeout(() => {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            matchedPairs++;
            checkWin();
            resetBoard();
        }, 500);
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }

    updateMoves();
}

function updateMoves() {
    moves--;
    document.getElementById("moves").textContent = moves;

    if (moves === 0) {
        showPopup(false);
    }
}

function checkWin() {
    if (matchedPairs === 3) {
        showPopup(true);
    }
}

function showPopup(isWin) {
    let popup = document.getElementById("popup");
    let message = document.getElementById("message");
    let giftCode = document.getElementById("gift-code");

    message.textContent = isWin ? "Congratulations! You won! 🎉" : "Sorry, you lost. But here’s your gift!";
    giftCode.textContent = generateCode();
    popup.style.display = "block";
}

function copyCode() {
    let code = document.getElementById("gift-code").textContent;
    navigator.clipboard.writeText(code);
    alert("Code copied!");
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function generateCode() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
