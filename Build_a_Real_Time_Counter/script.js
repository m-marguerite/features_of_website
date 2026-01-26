const textarea = document.getElementById("text-input");
const charCount = document.getElementById("char-count");
const maxChars = 50;

// Fonction pour mettre à jour le compteur
const updateTextarea = () => {
  let currentLength = textarea.value.length;

  // Si dépassement, on trim la valeur
  if (currentLength > maxChars) {
    textarea.value = textarea.value.substring(0, maxChars);
    alert(`You cannot exceed ${maxChars} characters.`);
    currentLength = maxChars;
  }

  // Mise à jour du texte du compteur
  charCount.textContent = `Character Count: ${currentLength}/${maxChars}`;


  // Changement de couleur 
  if (currentLength === maxChars) {
    charCount.style.color = "red";
  } else {
    charCount.style.color = "black";
  }
}

// Ecouteur d'événement pour mettre à jour en temps réel
textarea.addEventListener("input", updateTextarea);

// Initialisation du compteur
updateTextarea();
