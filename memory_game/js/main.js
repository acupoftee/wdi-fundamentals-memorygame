console.log("Up and running!");

var cards = [
{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png"
}
];

var cardsInPlay = [];
var score = 0;
var win = false;
var scoreText = document.getElementById('score');

// utility function to add challenge to the game once it's scaled!
// to try the game out with a shuffle, 
// feel free to uncomment line 45 and line 93!
function shuffleCards() {
	for (var i = 0; i < cards.length; i++) {
		var randomIndex = Math.floor((Math.random() * cards.length));

		var tempCard = cards[i];
		cards[i] = cards[randomIndex];
		cards[randomIndex] = tempCard;
	}
}

function createBoard() {
	//shuffleCards();
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

function flipCard() {
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	cardsInPlay.push(cards[cardId].rank);
	this.setAttribute('src', cards[cardId].cardImage);
	if (cardsInPlay.length === 2) {
		checkForMatch();
	}
}

function checkForMatch() {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		// add one point for each match and update the score
		score++;
		scoreText.textContent = score;
		win = true;
		alert("You found a match! Click the reset to play again!");
	} else {
		// resetBard() will reset the score to zero
		// if done here, the score will be reset before the refresh
		// for aesthetic reasons, we'll have it reset after the refresh
		win = false;
		alert("Sorry, game over. Click reset to play again!");
	}
}

function resetBoard() {
	var images = document.getElementsByTagName('img');
	for (var i = 0; i < images.length; i++) {
		images[i].setAttribute('src', "images/back.png");
	}
	if (!win) {
		// reset the score to zero for each loss
		score = 0;
		scoreText.textContent = score;
	}
	cardsInPlay = [];
	//shuffleCards();
}

var resetButton = document.getElementsByTagName('button')[0];
resetButton.addEventListener('click', resetBoard);

createBoard();
