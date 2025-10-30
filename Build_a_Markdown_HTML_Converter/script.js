// Retrieve DOM elements
const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

// Main function for Markdown conversion to HTML
function convertMarkdown() {
  // Retrieve the text from input
  let markdown = markdownInput.value;

  // 1. Converts texts h1 : # text -> <h1>text</h1>
  markdown = markdown.replace(/^# (.+)/gm, "<h1>$1</h1>");

  // 2. Converts texts h2 : ## text -> <h2>text</h2>
  markdown = markdown.replace(/^## (.+)/gm, "<h2>$1</h2>");

  // 3. Converts texts h3 : ### text -> <h3>text</h3>
  markdown = markdown.replace(/^### (.+)/gm, "<h3>$1</h3>");

  // 4. Converts texts to bold : **text** ou __text__ -> <strong>text</strong>
  // Double asterisk
  markdown = markdown.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Double underscore
  markdown = markdown.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // 5. Converts texts to italic : *text* ou _text_ -> <em>text</em>
  // Simple asterisk
  markdown = markdown.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Simple underscore
  markdown = markdown.replace(/_(.+?)_/g, "<em>$1</em>");

  // 6. Converts img : ![alt](src) -> <img alt="alt" src="src">
  // Must be done before links because the format is similar
  markdown = markdown.replace(
    /!\[([^\]]*)\]\(([^\)]*)\)/g,
    '<img alt="$1" src="$2">'
  );

  // 7. Converts links : [text](url) -> <a href="url">text</a>
  markdown = markdown.replace(
    /\[([^\]]*)\]\(([^\)]*)\)/g,
    '<a href="$2">$1</a>'
  );

  // 8. Converts quotes : > text -> <blockquote>text</blockquote>
  markdown = markdown.replace(/^> (.+)/gm, "<blockquote>$1</blockquote>");

  // Returns the generated HTML
  return markdown;
}

// Funtion for update the display
function updateOutput() {
  // Call the function for converts
  const html = convertMarkdown();

  // Display the row HTML code in #html-output
  htmlOutput.textContent = html;

  // Display the HTMl rendering in #preview
  preview.innerHTML = html;
}

// Event listener on input for update in real time
markdownInput.addEventListener("input", updateOutput);

// Initial update when the page load
updateOutput();
