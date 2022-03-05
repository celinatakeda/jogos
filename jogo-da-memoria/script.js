const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firsCard, secondCard;
let lockBoard = false; //trancar tabuleiro

//função  para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firsCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firsCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firsCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firsCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//função que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firsCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        restBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function restBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firsCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});