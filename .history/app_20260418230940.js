// Load pages from localStorage OR use default
let pages = JSON.parse(localStorage.getItem("pages")) || [
  {
  id: "123",
  title: "My Page",
  content: "...",
  icon: "page-icon.png"
}
];

let currentPageId = null;

// Save all pages
function savePages() {
  localStorage.setItem("pages", JSON.stringify(pages));
}

// Create new page
function createPage() {
  const newPage = {
    id: Date.now().toString(),
    title: "Untitled",
    content: "",
    icon: "page-icon.png" // default icon
  };

  pages.push(newPage);
  savePages();
  renderPages();
  openPage(newPage.id);
}

// Render sidebar

// Open page
function openPage(id) {
    console.log("Opening page:", id);
  const page = pages.find(p => p.id === id);
  currentPageId = id;

  if (!page) return;

  document.getElementById("pageTitle").value = page.title;
  document.getElementById("editorArea").innerHTML = page.content;
}

// Auto save current page
function saveCurrentPage() {
  const page = pages.find(p => p.id === currentPageId);
  if (!page) return;

  page.title = document.getElementById("pageTitle").value;
  page.content = document.getElementById("editorArea").innerHTML;

  savePages();
}
//del func
function deleteCurrentPage() {
  if (!currentPageId) return;

  const confirmDelete = confirm("Delete this page?");
  if (!confirmDelete) return;

  pages = pages.filter(p => p.id !== currentPageId);

  savePages();
  renderPages();

  if (pages.length > 0) {
    openPage(pages[0].id);
  } else {
    currentPageId = null;
    document.getElementById("pageTitle").value = "";
    document.getElementById("editorArea").innerHTML = "";
  }
}
function formatText(command) {
  const editor= document.getElementById("editorArea");
  editor.focus();
  document.execCommand(command,false,null)
}
let currentFontSize = 3;
function changeFontSize(step){
  const editor= document.getElementById("editorArea");
  editor.focus();
  currentFontSize += step;
  if (currentFontSize < 1) currentFontSize = 1;
  if (currentFontSize > 7) currentFontSize = 7;

  document.execCommand("fontSize", false, currentFontSize);
}
// Event listeners
document.getElementById("newPageBtn").onclick = createPage;
document.getElementById("editorArea").addEventListener("input", saveCurrentPage);
document.getElementById("pageTitle").addEventListener("input", saveCurrentPage);
document.getElementById("deletePageBtn").onclick = deleteCurrentPage;

renderPages();