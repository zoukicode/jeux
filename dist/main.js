"use strict";
var box = document.querySelectorAll('.box');
var titre = document.querySelector('h1');
var body = document.querySelector('body');
var tabe = [];
var bien = 0;
var level = 1;
var isPlaying = false;
var messageOver = "Game Over. Appuie sur Entrée pour recommencer.";
document.addEventListener('keydown', function (keyevent) {
    if (keyevent.key === 'Enter' && !isPlaying) {
        resetGame();
        isPlaying = true;
        titre.innerText = "Level " + level;
        playSequence();
    }
});
box.forEach(function (element, index) {
    element.addEventListener('click', function () {
        if (!isPlaying)
            return;
        var expected = tabe[bien];
        if (element === expected) {
            bien++;
            if (bien === tabe.length) {
                // Séquence bien jouée, passer au niveau suivant
                level++;
                titre.innerText = "Level " + level;
                bien = 0;
                playSequence();
            }
        }
        else {
            GameOver();
        }
    });
});
function playSequence() {
    // Ajouter une nouvelle boîte aléatoire à la séquence
    var aleatoire = Math.floor(Math.random() * box.length);
    var newBox = box[aleatoire];
    tabe.push(newBox);
    // Montrer toute la séquence visuellement (une par une)
    setTimeout(function () {
        newBox.style.boxShadow = '1px 3px 8px 10px white';
        setTimeout(function () {
            newBox.style.boxShadow = 'none';
        }, 600);
    }, 800); // décalage pour chaque boîte
}
function GameOver() {
    flashBody();
    titre.innerHTML = "<h1 class=\"text-red-700 font-lg\">".concat(messageOver, "</h1>");
    isPlaying = false;
    resetGame();
}
function resetGame() {
    tabe.length = 0;
    bien = 0;
    level = 1;
}
function flashBody() {
    var interval = setInterval(function () {
        body.classList.add('bg-red-300');
    }, 100);
    setTimeout(function () {
        clearInterval(interval);
        body.classList.remove('bg-red-300');
    }, 500);
}
