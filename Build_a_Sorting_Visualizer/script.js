const generateElement = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const generateArray = () => {
  let array = [];

  for (let i = 0; i < 5; i++) {
    array.push(generateElement());
  }

  return array;
};

const generateContainer = () => {
  const div = document.createElement("div");
  return div;
};

const fillArrContainer = (el, arr) => {
  el.innerHTML = ""; // Clear existing content
  for (let i = 0; i < arr.length; i++) {
    const span = document.createElement("span");
    span.textContent = arr[i];
    el.appendChild(span);
  }
};

const isOrdered = (a, b) => {
  return a <= b;
};

const swapElements = (arr, index) => {
  if (!isOrdered(arr[index], arr[index + 1])) {
    let temp = arr[index];
    arr[index] = arr[index + 1];
    arr[index + 1] = temp;
  }
};

const highlightCurrentEls = (el, index) => {
  el.children[index].style.cssText = "border: 2px dashed red;";
  el.children[index + 1].style.cssText = "border: 2px dashed red;";
};

const generateBtn = document.getElementById("generate-btn");

generateBtn.addEventListener("click", () => {
  const startingArrayEl = document.getElementById("starting-array");
  const arrayContainerEl = document.getElementById("array-container");

  // Clear all children of array-container except starting-array
  while (arrayContainerEl.children.length > 1) {
    arrayContainerEl.removeChild(arrayContainerEl.lastChild);
  }

  const arr = generateArray();
  fillArrContainer(startingArrayEl, arr);
});

const sortBtn = document.getElementById("sort-btn");

sortBtn.addEventListener("click", () => {
  const startingArrayEl = document.getElementById("starting-array");
  const arrayContainerEl = document.getElementById("array-container");

  // Get the array from starting-array
  const arr = [];
  for (let span of startingArrayEl.children) {
    arr.push(Number(span.textContent));
  }

  // Clear all divs except starting-array
  while (arrayContainerEl.children.length > 1) {
    arrayContainerEl.removeChild(arrayContainerEl.lastChild);
  }

  // Highlight the first two elements in starting-array
  highlightCurrentEls(startingArrayEl, 0);

  // Bubble Sort with visualization
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      // Swap if necessary
      if (!isOrdered(arr[i], arr[i + 1])) {
        swapElements(arr, i);
        swapped = true;

        // Create a step after the swap
        const stepDiv = generateContainer();
        fillArrContainer(stepDiv, arr);

        // Highlight current pair being compared
        highlightCurrentEls(stepDiv, i);

        arrayContainerEl.appendChild(stepDiv);
      }
    }
  } while (swapped);

  // Add final sorted array with green border on the div
  const finalDiv = generateContainer();
  fillArrContainer(finalDiv, arr);

  // Add green border to the final div container
  finalDiv.style.cssText = "border: 3px solid green;";

  arrayContainerEl.appendChild(finalDiv);
});
