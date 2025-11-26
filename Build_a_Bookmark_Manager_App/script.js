// ---------- Storage utilities ----------
function getBookmarks() {
  const raw = localStorage.getItem("bookmarks");
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const ok = parsed.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.name === "string" &&
        typeof item.category === "string" &&
        typeof item.url === "string"
    );
    return ok ? parsed : [];
  } catch (e) {
    return [];
  }
}

function setBookmarks(arr) {
  localStorage.setItem("bookmarks", JSON.stringify(arr));
}

// ---------- DOM references ----------
const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const listSection = document.getElementById("bookmark-list-section");

const categoryDropdown = document.getElementById("category-dropdown");

const addBookmarkButton = document.getElementById("add-bookmark-button");
const viewCategoryButton = document.getElementById("view-category-button");

const closeFormButton = document.getElementById("close-form-button");
const addBookmarkFormButton = document.getElementById(
  "add-bookmark-button-form"
);

const closeListButton = document.getElementById("close-list-button");
const deleteBookmarkButton = document.getElementById("delete-bookmark-button");

const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const categoryList = document.getElementById("category-list");

// Helper to set all visible .category-name spans
function setDisplayedCategoryName(text) {
  document
    .querySelectorAll(".category-name")
    .forEach((el) => (el.textContent = text));
}

// ---------- UI toggle functions ----------
function displayOrCloseForm() {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
}

function displayOrHideCategory() {
  mainSection.classList.toggle("hidden");
  listSection.classList.toggle("hidden");
}

// ---------- Render function ----------
function renderCategoryList(category) {
  // Clear previous entries to avoid duplicates (test 22)
  categoryList.innerHTML = "";

  const bookmarks = getBookmarks().filter((b) => b.category === category);

  if (bookmarks.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No Bookmarks Found";
    categoryList.appendChild(p);
    return;
  }

  bookmarks.forEach((b) => {
    // Create radio
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = b.name; // per tests: id = bookmark.name
    radio.value = b.name; // per tests: value = bookmark.name
    radio.name = "bookmark"; // same name for all radios

    // Create label
    const label = document.createElement("label");
    label.setAttribute("for", b.name);

    const a = document.createElement("a");
    a.href = b.url;
    a.textContent = b.name;

    label.appendChild(a);

    const wrapper = document.createElement("div");
    wrapper.appendChild(radio);
    wrapper.appendChild(label);

    categoryList.appendChild(wrapper);
  });
}

// ---------- Event listeners ----------

// When clicking "Add Bookmark" on main: set category name and open form
addBookmarkButton.addEventListener("click", () => {
  const selected = categoryDropdown.value;
  setDisplayedCategoryName(selected);
  displayOrCloseForm();
});

// When clicking "Go Back" in the form: close form
closeFormButton.addEventListener("click", () => {
  displayOrCloseForm();
});

// When clicking "Add Bookmark" inside the form: save data, reset inputs, close form
addBookmarkFormButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();
  const category = categoryDropdown.value;

  const bookmark = { name, category, url };

  const arr = getBookmarks();
  arr.push(bookmark);
  setBookmarks(arr);

  nameInput.value = "";
  urlInput.value = "";

  displayOrCloseForm();
});

// When clicking "View Category": set category name, render list, toggle view
viewCategoryButton.addEventListener("click", () => {
  const selected = categoryDropdown.value;
  setDisplayedCategoryName(selected);
  renderCategoryList(selected);
  displayOrHideCategory();
});

// When clicking "Go Back" in the list: hide list and show main
closeListButton.addEventListener("click", () => {
  displayOrHideCategory();
});

// When clicking "Delete Bookmark": remove selected radio's bookmark and re-render
deleteBookmarkButton.addEventListener("click", () => {
  const checked = categoryList.querySelector('input[name="bookmark"]:checked');
  if (!checked) return; // nothing selected

  const selectedName = checked.value;
  const category = document.querySelector(
    "#bookmark-list-section .category-name"
  ).textContent;

  const updated = getBookmarks().filter(
    (b) => !(b.name === selectedName && b.category === category)
  );
  setBookmarks(updated);

  // re-render for same category
  renderCategoryList(category);
});
