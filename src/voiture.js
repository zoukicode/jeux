"use strict";
var voiture = document.querySelectorAll('.voiture');
var boxs = document.querySelector('.box');
var p = document.querySelector('p');
var selecte = document.querySelector('select');
var courserobot;
var normale = 900;
var moyen = 600;
var rapide = 300;
var time = 0;
function niveau() {
    if (selecte.value === 'Moyen') {
        time = moyen;
    }
    else if (selecte.value === 'Rapide') {
        time = rapide;
    }
    else {
        time = normale;
    }
}
var robot = voiture[1];
var voiture_utilisateur = voiture[0];
var playing = false;
document.addEventListener('keydown', function (eventkey) {
    if (eventkey.key === 'Enter' && !playing) {
        p.innerText = '';
        playing = true;
        robot.style.transform = "translateX(0px)";
        voiture_utilisateur.style.transform = "translateX(0px)";
        Game();
    }
});
var phrase = [
    "Ali pédale son vélo",
    "Je viens de construire ma propre maison",
    "Je sais nager",
    "Je vais payer ma nouvelle voiture dans cette année",
    "Le soleil brillait pendant que les enfants jouaient dans le parc",
    "Chaque matin, elle boit son café en lisant le journal",
    "Le chat noir saute doucement sur le canapé de grand-mère",
    "Demain, nous partirons en voyage pour découvrir de nouvelles cultures",
    "Il est important de respecter les règles pour vivre en harmonie",
    "Même sous la pluie, elle continue de courir avec détermination",
    "Le professeur explique la leçon avec passion et beaucoup de clarté"
];
function Game() {
    niveau();
    var nombre_aleatoire = Math.floor(Math.random() * phrase.length);
    var texte = phrase[nombre_aleatoire];
    var largeur = boxs.getBoundingClientRect().width - 318;
    var nombreDeLettres = texte.length;
    var pasDeplacement = largeur / nombreDeLettres;
    var deplace_robot = 0;
    var deplace_utilisateur = 0;
    var click = 0;
    var spans = [];
    for (var i = 0; i < texte.length; i++) {
        var span = document.createElement('span');
        span.textContent = texte[i];
        p.appendChild(span);
        spans.push(span);
    }
    function deplacementRobot() {
        deplace_robot += pasDeplacement;
        robot.style.transform = "translateX(".concat(deplace_robot, "px)");
        if (deplace_robot >= largeur) {
            clearInterval(courserobot);
            alert("Le robot a gagné !");
            endGame();
        }
    }
    courserobot = setInterval(deplacementRobot, time);
    function utilisateurAvance() {
        deplace_utilisateur += pasDeplacement;
        voiture_utilisateur.style.transform = "translateX(".concat(deplace_utilisateur, "px)");
        console.log('nombre de pas:' + deplace_utilisateur + ' Largeur:' + largeur);
        if (Math.abs(deplace_utilisateur - largeur) < 1e-9) {
            clearInterval(courserobot);
            alert("Bravo ! Vous avez gagné !");
            endGame();
        }
    }
    function ecoute(e) {
        if (!playing)
            return;
        var attendu = texte[click];
        var touche = e.key;
        if (touche === attendu) {
            spans[click].classList.add('lettre');
            click++;
            utilisateurAvance();
        }
        if (click >= texte.length || deplace_utilisateur >= largeur || deplace_robot >= largeur) {
            document.removeEventListener('keydown', ecoute);
        }
    }
    document.addEventListener('keydown', ecoute);
    function endGame() {
        playing = false;
        p.innerHTML = '';
        p.innerText = 'Clicker sur enter pour recommencer';
        document.removeEventListener('keydown', ecoute);
    }
}
