const box = document.querySelectorAll('.box') as NodeListOf<HTMLDivElement>;
const titre = document.querySelector('h1') as HTMLHeadElement;
const body = document.querySelector('body') as HTMLBodyElement;

let tabe: HTMLDivElement[] = [];
let bien = 0;
let level = 1;
let isPlaying = false;

const messageOver = "Game Over. Appuie sur Entrée pour recommencer.";

document.addEventListener('keydown', (keyevent) => { 
  if (keyevent.key === 'Enter' && !isPlaying) {
    resetGame();
    isPlaying = true;
    titre.innerText = "Level " + level;
    playSequence();
  }
});

box.forEach((element, index) => {
  element.addEventListener('click', () => {
    if (!isPlaying) return;

    const expected = tabe[bien];

    if (element === expected) {
      bien++;
      if (bien === tabe.length) {
        // Séquence bien jouée, passer au niveau suivant
        level++;
        titre.innerText = "Level " + level;
        bien = 0;
        playSequence();
      }
    } else {
      GameOver();
    }
  });
});

function playSequence() {
  // Ajouter une nouvelle boîte aléatoire à la séquence
  const aleatoire = Math.floor(Math.random() * box.length);
  const newBox = box[aleatoire];
  tabe.push(newBox);

  // Montrer toute la séquence visuellement (une par une)
    setTimeout(() => {
      newBox.style.boxShadow = '1px 3px 8px 10px white';
      setTimeout(() => {
        newBox.style.boxShadow = 'none';
      }, 600);
    },  800); // décalage pour chaque boîte
}

function GameOver() {
  flashBody();
  titre.innerHTML = `<h1 class="text-red-700 font-lg">${messageOver}</h1>`;
  isPlaying = false;
  resetGame();
}

function resetGame() {
  tabe.length = 0;
  bien = 0;
  level = 1;
}

function flashBody() {
  const interval = setInterval(() => {
    body.classList.add('bg-red-300');
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    body.classList.remove('bg-red-300');
  }, 500);
}
