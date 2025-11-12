// Access elements
const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");

const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");

// Function to retrieve flags
function getFlags() {
  let flags = "";
  if (caseInsensitiveFlag.checked) flags += "i";
  if (globalFlag.checked) flags += "g";
  return flags;
}

// Function for test and highlight the regex
function testRegex() {
  const pattern = regexPattern.value;
  const text = stringToTest.innerText;
  const flags = getFlags();

  // If pattern empty, reset and leave
  if (!pattern) {
    stringToTest.innerHTML = text;
    testResult.innerText = "";
    return;
  }

  try {
    const regex = new RegExp(pattern, flags);
    const matches = text.match(regex);

    if (matches) {
      // Replace matches in the text with highlight spans
      const highlightedText = text.replace(
        regex,
        (match) => `<span class="highlight">${match}</span>`
      );
      stringToTest.innerHTML = highlightedText;

      // Display matches in #result
      testResult.innerText = matches.join(", ");
    } else {
      // No matches
      testResult.innerText = "no match";
      stringToTest.innerHTML = text;
    }
  } catch (error) {
    // Invalid Regex
    testResult.innerText = "Invalid regex";
  }
}

// Updates event in real time
regexPattern.addEventListener("input", testRegex);
stringToTest.addEventListener("input", testRegex);
caseInsensitiveFlag.addEventListener("change", testRegex);
globalFlag.addEventListener("change", testRegex);
// Mandatory event
testButton.addEventListener("click", testRegex);
