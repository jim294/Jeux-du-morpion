var currentPlayer = "X";
var board = document.getElementById("board");
var cells = board.getElementsByTagName("td");
var gameEnded = false;

// Tableau représentant l'état du jeu
var gameState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

// Fonction pour vérifier l'état du jeu et déterminer s'il y a un gagnant
function checkWin() {
  var winningCombinations = [
    // lignes
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // colonnes
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonales
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (var i = 0; i < winningCombinations.length; i++) {
    var [a, b, c] = winningCombinations[i];
    if (
      gameState[Math.floor(a / 3)][a % 3] === currentPlayer &&
      gameState[Math.floor(b / 3)][b % 3] === currentPlayer &&
      gameState[Math.floor(c / 3)][c % 3] === currentPlayer
    ) {
      return true;
    }
  }

  return false;
}

// Fonction appelée lorsqu'une cellule est cliquée
function handleCellClick(event) {
  if (gameEnded) {
    return; // Le jeu est terminé, ne rien faire
  }

  var cell = event.target;
  var rowIndex = cell.parentElement.rowIndex;
  var cellIndex = cell.cellIndex;

  if (gameState[rowIndex][cellIndex] === "") {
    // La cellule est vide, mettre à jour l'état du jeu et l'affichage
    cell.textContent = currentPlayer;
    gameState[rowIndex][cellIndex] = currentPlayer;

    if (checkWin()) {
      // Un joueur a gagné, afficher un message de victoire
      alert("Le joueur " + currentPlayer + " a gagné !");
      gameEnded = true;
    } else {
      // Aucun joueur n'a encore gagné, passer au joueur suivant
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

// Ajouter un gestionnaire d'événement pour chaque cellule
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleCellClick);
}
