// array die de kaarten(symbolen) bevat
var card = document.getElementsByClassName("card");
var cards = [...card];
// een deck van alle kaarten
var deck = document.getElementById("card-deck");
//pogingen
var pogingen = 0;
var counter = document.querySelector(".pogingen");
// declaratie sterren
var sterren = document.querySelectorAll(".ster");
// declaring variable of matchedCards
var matchedCard = document.getElementsByClassName("match");
// sluit icon in winscherm
var sluiticon = document.querySelector(".close");
// declare winscherm
var winscherm = document.getElementById("popup1");
// array voor open kaarten
var openedCards = [];
//shuffeld al de kaarten door elkaar
function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// nieuw spel starten
function startGame() {
    var i;
    // shuffle kaartdeck
    cards = shuffle(cards);
    // lle bestaande classen van elke kaart verwijderen
    for (i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // pogingen op 0
    pogingen = 0;
    counter.innerHTML = pogingen;
    // rating op 0 zetten
    for (i = 0; i < sterren.length; i++) {
        sterren[i].style.color = "#FFD700";
        sterren[i].style.visibility = "visible";
    }
}
// als je het de pagina laad start het spel(shuffeld hij alle kaarten door elkaar)
document.body.onload = startGame();
// de 3 soorten kaarten "open" "show" en "disabled"
var displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};
// geopende kaarten aan lijst toevoegen en kijken of de kaarten matchen of niet
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].type === openedCards[1].type) {
            matched();
        }
        else {
            unmatched();
        }
    }
}
// als kaarten matchen
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}
// als kaarten niet matchen
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        openedCards = [];
    }, 1100);
}
// kaarten even disabelen
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}
// kaarten enablenen en gematchte kaarten disabelen
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}
// start de timer bij de eerste zet en toon je score
function moveCounter() {
    pogingen++;
    counter.innerHTML = pogingen;
    //sstart de timer als je een eerste poging hebt gedaan
    if (pogingen == 1) {
        seconden = 0;
        minuten = 0;
        startTimer();
    }
    // score bepalen a.d.h.v de pogingen
    if (pogingen > 10 && pogingen < 15) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                sterren[i].style.visibility = "collapse";
            }
        }
    }
    else if (pogingen > 20) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                sterren[i].style.visibility = "collapse";
            }
        }
    }
}
// timer voor het spel
var seconden = 0
    , minuten = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minuten + " minuten " + seconden + " seconden";
        seconden++;
        if (seconden == 60) {
            minuten++;
            seconden = 0;
        }
    }, 1000);
}
// als de al de kaarten matchen komt er een popup dat je gew
function congratulations() {
    if (matchedCard.length == 16) {
        finalTime = timer.innerHTML;
        //tonen dat je gewonnen hebt
        winscherm.classList.add("show");
        // de score declareren
        var starRating = document.querySelector(".sterren").innerHTML;
        //je pogingen, score en tijd tonen
        document.getElementById("finalMove").innerHTML = pogingen;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        sluitwinscherm();
    }
}
// icoon om popup te sluiten
function sluitwinscherm() {
    sluiticon.addEventListener("click", function () {
        winscherm.classList.remove("show");
        startGame();
        minuten = 0;
        seconden = 0;
    });
}
// reset button om opnieuw te spelen
function playAgain() {
    winscherm.classList.remove("show");
    startGame();
    minuten = 0;
    seconden = 0;
}
// loop om een event van "listeners" toe te voegen aan elke kaart
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
}