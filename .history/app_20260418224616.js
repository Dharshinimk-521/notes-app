// Load pages from localStorage OR use default
let pages = JSON.parse(localStorage.getItem("pages")) || [
  {
    id: "123",
    title: "My First Page",
    content: "<p>Hello world</p>"
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
    content: ""
  };

  pages.push(newPage);
  savePages();
  renderPages();
  openPage(newPage.id);
}

// Render sidebar
function renderPages() {
  const pageList = document.getElementById("pageList");
  pageList.innerHTML = "";

  pages.forEach((page) => {
    const li = document.createElement("li");
    li.textContent = page.title;

    if (page.id === currentPageId) {
      li.style.background = "#ddd";

    }

    li.onclick = () => openPage(page.id);

    pageList.appendChild(li);
  });
}

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
function SizeStepper(step){
  const editor= document.getElementById("editorArea");
  editor.focus();
  currentPageId
}
// Event listeners
document.getElementById("newPageBtn").onclick = createPage;
document.getElementById("editorArea").addEventListener("input", saveCurrentPage);
document.getElementById("pageTitle").addEventListener("input", saveCurrentPage);
document.getElementById("deletePageBtn").onclick = deleteCurrentPage;
// Initial render
renderPages();