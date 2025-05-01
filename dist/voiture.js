"use strict";
const voiture = document.querySelectorAll('.voiture');
const boxs = document.querySelector('.box');
const p = document.querySelector('p');
const selecte = document.querySelector('select');
let courserobot;
const normale = 900;
const moyen = 600;
const rapide = 300;
let time = 0;
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
const robot = voiture[1];
const voiture_utilisateur = voiture[0];
let playing = false;
document.addEventListener('keydown', (eventkey) => {
    if (eventkey.key === 'Enter' && !playing) {
        p.innerText = '';
        playing = true;
        robot.style.transform = `translateX(0px)`;
        voiture_utilisateur.style.transform = `translateX(0px)`;
        Game();
    }
});
const phrase = [
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
    let nombre_aleatoire = Math.floor(Math.random() * phrase.length);
    const texte = phrase[nombre_aleatoire];
    const largeur = boxs.getBoundingClientRect().width - 318;
    const nombreDeLettres = texte.length;
    const pasDeplacement = largeur / nombreDeLettres;
    let deplace_robot = 0;
    let deplace_utilisateur = 0;
    let click = 0;
    const spans = [];
    for (let i = 0; i < texte.length; i++) {
        const span = document.createElement('span');
        span.textContent = texte[i];
        p.appendChild(span);
        spans.push(span);
    }
    function deplacementRobot() {
        deplace_robot += pasDeplacement;
        robot.style.transform = `translateX(${deplace_robot}px)`;
        if (deplace_robot >= largeur) {
            clearInterval(courserobot);
            alert("Le robot a gagné !");
            endGame();
        }
    }
    courserobot = setInterval(deplacementRobot, time);
    function utilisateurAvance() {
        deplace_utilisateur += pasDeplacement;
        voiture_utilisateur.style.transform = `translateX(${deplace_utilisateur}px)`;
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
        const attendu = texte[click];
        const touche = e.key;
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
