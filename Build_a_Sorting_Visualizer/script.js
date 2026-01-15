// Generate a random integer between 1 and 100 inclusive
function generateElement() {
  return Math.floor(Math.random() * 100) + 1;
}

// Generate an array of 5 random integers
function generateArray() {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(generateElement());
  }
  return arr;
}

// Create and return an empty div element
function generateContainer() {
  return document.createElement("div");
}

// Populate element with span elements showing array values
function fillArrContainer(element, array) {
  // Clear existing content
  element.innerHTML = "";

  // Create and append span elements for each array value
  for (let i = 0; i < array.length; i++) {
    const span = document.createElement("span");
    span.textContent = array[i];
    element.appendChild(span);
  }
}

// Check if first integer is less than or equal to second
function isOrdered(a, b) {
  return a <= b;
}

// Swap elements at index and index+1 if they are not ordered
function swapElements(array, index) {
  if (!isOrdered(array[index], array[index + 1])) {
    const temp = array[index];
    array[index] = array[index + 1];
    array[index + 1] = temp;
  }
}

// Highlight elements at index and index+1 with dashed red border
function highlightCurrentEls(element, index) {
  const children = element.children;
  if (children[index]) {
    children[index].style.border = "3px dashed red";
  }
  if (children[index + 1]) {
    children[index + 1].style.border = "3px dashed red";
  }
}

/* =======================
   Generate Array Button
======================= */

// Event listener for Generate Array button
document.getElementById("generate-btn").addEventListener("click", function () {
  const arrayContainer = document.getElementById("array-container");
  const startingArray = document.getElementById("starting-array");

  // Remove all children except starting-array
  while (arrayContainer.firstChild) {
    if (arrayContainer.firstChild === startingArray) {
      arrayContainer.removeChild(startingArray);
      break;
    }
    arrayContainer.removeChild(arrayContainer.firstChild);
  }
  while (arrayContainer.lastChild) {
    arrayContainer.removeChild(arrayContainer.lastChild);
  }

  // Re-add starting-array
  arrayContainer.appendChild(startingArray);

  // Generate new array and fill starting-array
  const newArray = generateArray();
  fillArrContainer(startingArray, newArray);
});

/* =======================
   Sort Array Button
======================= */

// Event listener for Sort Array button
document.getElementById("sort-btn").addEventListener("click", function () {
  const arrayContainer = document.getElementById("array-container");
  const startingArray = document.getElementById("starting-array");

  // Get the current array from starting-array
  const spans = startingArray.querySelectorAll("span");
  if (spans.length === 0) {
    return; // No array to sort
  }

  const array = Array.from(spans).map((span) => parseInt(span.textContent));

  // Remove all children from array-container EXCEPT starting-array
  const childrenToRemove = [];
  for (let child of arrayContainer.children) {
    if (child !== startingArray) {
      childrenToRemove.push(child);
    }
  }
  childrenToRemove.forEach((child) => arrayContainer.removeChild(child));

  // Refill starting array and highlight first two elements
  fillArrContainer(startingArray, array);
  highlightCurrentEls(startingArray, 0);

  // Bubble Sort with visualization
  const workingArray = [...array];
  let swapped;
  let isFirstComparison = true;

  do {
    swapped = false;
    for (let i = 0; i < workingArray.length - 1; i++) {
      // Skip creating div for the very first comparison (shown in starting-array)
      if (!isFirstComparison) {
        const container = generateContainer();
        container.classList.add("step");

        fillArrContainer(container, workingArray);
        highlightCurrentEls(container, i);
        arrayContainer.appendChild(container);
      }
      isFirstComparison = false;

      // Perform swap if needed AFTER creating the div
      if (!isOrdered(workingArray[i], workingArray[i + 1])) {
        swapElements(workingArray, i);
        swapped = true;
      }
    }

    // If we need another pass, show the start of it
    if (swapped) {
      const container = generateContainer();
      container.classList.add("step");

      fillArrContainer(container, workingArray);
      highlightCurrentEls(container, 0);
      arrayContainer.appendChild(container);
      isFirstComparison = true; // Next iteration will skip the first comparison
    }
  } while (swapped);

  // Add final sorted array (no highlights)
  const finalContainer = generateContainer();
  fillArrContainer(finalContainer, workingArray);
  finalContainer.style.border = "3px solid green";
  arrayContainer.appendChild(finalContainer);
});
