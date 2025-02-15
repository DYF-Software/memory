function adjustGameLayout() {
    const gameContainer = document.querySelector(".game-container");
    const cardsContainer = document.querySelector(".cards");
    const cards = document.querySelectorAll(".card");

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let isPortrait = screenHeight > screenWidth;

    let columns = screenWidth < 600 ? 2 : (isPortrait ? 2 : 3);
    cardsContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    let gapSize = 8;

    let containerMaxWidth = Math.min(340, screenWidth * 0.9); 

    let totalGapWidth = (columns - 1) * gapSize;

    let cardSize = (containerMaxWidth - totalGapWidth) / columns;
    
    let minCardSize = 60;
    let maxCardSize = 140;
    cardSize = Math.max(minCardSize, Math.min(cardSize, maxCardSize));

    cards.forEach(card => {
        card.style.boxSizing = "border-box";
        card.style.width = cardSize + "px";
        card.style.height = cardSize + "px";
        card.style.fontSize = (cardSize * 0.4) + "px";
    });
}

window.addEventListener("resize", adjustGameLayout);
window.addEventListener("load", adjustGameLayout);
