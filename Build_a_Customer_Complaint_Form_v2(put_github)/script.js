// Sélection du formulaire et de la zone de message
const form = document.getElementById("form");
const messageBox = document.getElementById("message-box");

// Empêche le rechargement et lance la validation
form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  // Récupération des champs
  const fields = [
    document.getElementById("full-name"),
    document.getElementById("email"),
    document.getElementById("order-no"),
    document.getElementById("product-code"),
    document.getElementById("quantity"),
    document.getElementById("complaint-description"),
    document.getElementById("solution-description"),
  ];

  // Réinitialise les styles précédents
  fields.forEach((f) => {
    f.classList.remove("invalid", "valid");
  });

  // Vérification des cases à cocher et boutons radio
  const complaintsChecked = Array.from(
    document.querySelectorAll('input[name="complaint"]:checked')
  );
  const solutionChecked = document.querySelector(
    'input[name="solutions"]:checked'
  );

  let isValid = true;

  // Vérifie si tous les champs sont remplis
  fields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("invalid");
      isValid = false;
    } else {
      field.classList.add("valid");
    }
  });

  // Vérifie qu'au moins une raison de plainte est cochée
  if (complaintsChecked.length === 0) {
    showMessage("Please select at least one complaint reason.", "red");
    isValid = false;
  }

  // Vérifie qu'une solution est choisie
  if (!solutionChecked) {
    showMessage("Please select a desired solution.", "red");
    isValid = false;
  }

  // Vérifie la longueur des descriptions
  const complaintDesc = fields[5].value.trim();
  const solutionDesc = fields[6].value.trim();

  if (complaintDesc.length < 20) {
    fields[5].classList.add("invalid");
    showMessage(
      "Please describe your complaint in at least 20 characters.",
      "red"
    );
    isValid = false;
  }

  if (solutionDesc.length < 20) {
    fields[6].classList.add("invalid");
    showMessage(
      "Please describe the desired solution in at least 20 characters.",
      "red"
    );
    isValid = false;
  }

  // Si un champ est invalide → on arrête ici
  if (!isValid) return;

  // Tout est valide
  showMessage("Your complaint has been submitted successfully!", "green");

  // Tous les champs passent en vert
  fields.forEach((f) => {
    f.classList.remove("invalid");
    f.classList.add("valid");
  });

  // Réinitialisation du formulaire après 1 seconde
  setTimeout(() => form.reset(), 1000);
}

// Fonction pour afficher un message dans la zone prévue
function showMessage(message, color) {
  messageBox.textContent = message;
  messageBox.style.color = color;
}
