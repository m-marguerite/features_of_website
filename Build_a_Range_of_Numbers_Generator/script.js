// Fonction récursive
const rangeOfNumbers = (startNum, endNum) => {
  if (startNum === endNum) {
    return [startNum];
  } else {
    return [...rangeOfNumbers(startNum, endNum - 1), endNum];
  }
};

// Sélection des éléments
const startInput = document.getElementById('startNum');
const endInput = document.getElementById('endNum');
const generateBtn = document.getElementById('generateBtn');
const resultContainer = document.getElementById('resultContainer');

// Fonction pour afficher le tableau
const displayNumbers = (numbers) => {
  resultContainer.innerHTML = ''; // Reset

  numbers.forEach((num, index) => {
    const card = document.createElement('div');
    card.classList.add('number-card');
    card.textContent = num;

    // Animation simple : delay selon l'index pour montrer la "construction"
    card.style.transitionDelay = `${index * 0.1}s`;
    resultContainer.appendChild(card);
  });
};

// Gestion du clic
generateBtn.addEventListener('click', () => {
  const start = parseInt(startInput.value);
  const end = parseInt(endInput.value);

  // Validation simple
  if (isNaN(start) || isNaN(end)) {
    alert('Merci de remplir Start Num et End Num correctement.');
    return;
  }
  if (start > end) {
    alert('Start Num doit être inférieur ou égal à End Num.');
    return;
  }

  // Appel de la fonction récursive
  const numbers = rangeOfNumbers(start, end);

  // Affichage
  displayNumbers(numbers);
});
