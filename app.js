/*
Les règles du jeu sont les suivantes :
- Le jeu a 2 joueurs, jouent à tour de rôle
- A chaque tour, un joueur lance un dé autant de fois qu'il le souhaite. Chaque résultat est ajouté à son score actuel
- Mais, si le joueur obtient un 1, son score actuel est perdu. Après cela, c'est au tour du joueur suivant
- Le joueur peut choisir de 'Passer', ce qui signifie que son score actuel est ajouté à son score global. Après cela, c'est au tour du joueur suivant
- Le premier joueur qui atteint 100 points sur son score global gagne le jeu

*/

//  Initialisation des variables
var scores, roundScore, activePlayer, gamePlaying;

// Initialisation du jeu
init();


//  Event listener pour le bouton "Lancer le dé"
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Générer un nombre aléatoire
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Afficher le résultat
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        //3. Mettre à jour le score si le dé n'est pas égal à 1
        if (dice !== 1) {
            //Ajouter le score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Passer au joueur suivant
            nextPlayer();
        }
    }    
});


// Event listener pour le bouton "Passer"
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Ajouter le score actuel au score global
        scores[activePlayer] += roundScore;

        // Mettre à jour l'UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Vérifier si le joueur a gagné
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Passer au joueur suivant
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Passer au joueur suivant
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //Remettre le score actuel à 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Changer le joueur actif
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    
    //Cacher le dé
    document.querySelector('.dice').style.display = 'none';
}

// Event listener pour le bouton "Nouveau jeu"
document.querySelector('.btn-new').addEventListener('click', init);

// Fonction pour initialiser le jeu
function init() {

    //Initialisation des variables
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    //Cacher le dé
    document.querySelector('.dice').style.display = 'none';

    //Initialisation des scores à 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Initialisation des noms des joueurs
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //Supprimer les classes winner et active
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}










