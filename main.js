const cardArray = [
  { name: "cat", img: "/cat.webp" },
  { name: "dog", img: "/dog.webp" },
  { name: "horse", img: "/horse.webp" },
  { name: "cow", img: "/cow.webp" },
  { name: "chicken", img: "/chicken.webp" },
  { name: "pig", img: "/pig.webp" },
  { name: "cat", img: "/cat.webp" },
  { name: "dog", img: "/dog.webp" },
  { name: "horse", img: "/horse.webp" },
  { name: "cow", img: "/cow.webp" },
  { name: "chicken", img: "/chicken.webp" },
  { name: "pig", img: "/pig.webp" },
];

cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector("#grid");
const resultDisplay = document.querySelector(".result");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

// Create the game board
function createBoard() {
  cardArray.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const cardFront = document.createElement("img");
    cardFront.src = "/front.webp";
    cardFront.classList.add("front");

    const cardBack = document.createElement("img");
    cardBack.src = card.img;
    cardBack.classList.add("back");

    cardElement.dataset.id = index;
    cardElement.addEventListener("click", flipCard);

    cardElement.appendChild(cardFront);
    cardElement.appendChild(cardBack);
    grid.appendChild(cardElement);
  });
}

// Flip the card
function flipCard() {
  const cardId = this.dataset.id;

  if (cardsChosenId.length === 2 || this.classList.contains("flip")) return;

  this.classList.add("flip");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);

  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 800);
  }
}

// Check for matches
function checkForMatch() {
  const cards = document.querySelectorAll(".card");
  const [optionOneId, optionTwoId] = cardsChosenId;

  if (optionOneId === optionTwoId) {
    cards[optionOneId].classList.remove("flip");
  } else if (cardsChosen[0] === cardsChosen[1]) {
    cards[optionOneId].classList.add("match");
    cards[optionTwoId].classList.add("match");
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].classList.remove("flip");
    cards[optionTwoId].classList.remove("flip");
  }

  cardsChosen = [];
  cardsChosenId = [];
  resultDisplay.textContent = cardsWon.length;

  if (cardsWon.length === cardArray.length / 2) {
    setTimeout(showWinMessage, 800);
  }
}

// Show win message
function showWinMessage() {
  alert("Congratulations! You found them all!");
  resetGame();
}

// Reset the game
function resetGame() {
  cardsWon = [];
  resultDisplay.textContent = 0;
  grid.innerHTML = "";
  cardArray.sort(() => 0.5 - Math.random());
  createBoard();
}

createBoard();
