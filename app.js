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
function renderPages() {
  const pageList = document.getElementById("pageList");
  pageList.innerHTML = "";

  pages.forEach((page) => {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = "page-icon.png";
    img.className = "page-icon";

    const span = document.createElement("span");
    span.textContent = page.title;

    li.appendChild(img);
    li.appendChild(span);

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
//func to bold and itallic text
function formatText(command) {
  const editor= document.getElementById("editorArea");
  editor.focus();
  document.execCommand(command,false,null)
}
let currentFontSize = 3;
//to change the font size
function changeFontSize(step){
  const editor= document.getElementById("editorArea");
  editor.focus();
  currentFontSize += step;
  if (currentFontSize < 1) currentFontSize = 1;
  if (currentFontSize > 7) currentFontSize = 7;

  document.execCommand("fontSize", false, currentFontSize);
}
//adding image files to the text area


window.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const editor = document.getElementById("editorArea");

  if (!imageInput || !editor) {
    console.error("Image input or editor not found!");
    return;
  }

  imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;

      img.style.maxWidth = "100%";
      img.style.margin = "10px 0";

      editor.appendChild(img);

      saveCurrentPage(); }

    reader.readAsDataURL(file);

    this.value = "";
  });
});
//to change the font 3 options:
function changeFont(type) {
  const editor = document.getElementById("editorArea");

  if (type === "default") {
    editor.style.fontFamily = "'Montserrat', sans-serif";
  }

  if (type === "sans") {
    editor.style.fontFamily = "Arial, sans-serif";
  }

  if (type === "mono") {
    editor.style.fontFamily = "monospace";
  }

  saveCurrentPage(); // optional persistence
}
//export as pdf
function exportPDF() {
  window.print();
}
//summarize option
function summarisePage() {
  const editor=document.getElementById("editorArea");
  const rawText=editor.innerText.trim();
  if(!rawText){
    alert('theres nth to summarise!');
    return;
  }
  //split by . ? !
  const sentences =rawText
    .split(/[.!?]+/) // split at . ! or ? (+ means one or more in a row)
    .map(s => s.trim()) //trim whitepace of each sentance
    .filter(s => s.length>0); // remove empty strings left over
  
  if (sentences.length ===0){
    alert("no sentences found!");
    return;

  }
  //take only 3 sentences adnd join
  const summary = sentences.slice(0,3).join(". ")+"." // slice(0,3) = items at index 0, 1, 2
  // If a summary box already exists on the page, remove it before making a new one
  const existing = document.getElementById("summaryBox");
  if (existing) existing.remove();                            // prevents duplicate boxes stacking up

  // Create a new div element in memory (not on the page yet)
  const box = document.createElement("div");
  box.id = "summaryBox";                                      // give it an id so we can find/remove it later
  box.innerHTML=`
  <div class="summary-header">
  <strong>Summary</strong>
  <button onclick="document.getElementById('summaryBox').remove()">X</button>
  </div>
  <p>${summary}</p>
  `;
  editor.parentElement.parentElement.appendChild(box);//appends to parent ele of editore = editor- container
  //apears below the editor area
};
//auto-link detection
function linkify(){
  const editor=document.getElementById("editorArea");
  const urlRegex = /((https?:\/\/|www\.)[^\s<>"']+)/g;
  //walk through each link to spot the url
  const walker = document.createTreeWalker(
    editor,
    NodeFilter.SHOW_TEXT,
    null
  );
  const nodesToReplace =[]; //collects matches first the replace after walking
  let node;
  while((node=walker.nextNode())){
    if(node.parentElement.tagName==='A') continue; //skip if <a>tag
    if (urlRegex.test(node.textContent)){
      nodesToReplace.push(node);//queue it for replacement
    }
    urlRegex.lastIndex=0; //reset regex pointer after each test
  }
  nodesToReplace.forEach(textNode => {
    const span=document.createElement("span");
    //replace every url with <a> tag
    span.innerHTML=textNode.textContent.replace(urlRegex,(url) =>{
      //if it dont start with http add https;// so it works
      const href=url.startsWith("http") ? url : "https://" + url;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;

    });
    //swap the original with the new link
    textNode.parentNode.replaceChild(span,textNode);
  });
  saveCurrentPage();

}
//page clean format : removes all the black.white strips when cpy paste part
document.getElementById("editorArea").addEventListener("paste", function(e) {
  e.preventDefault();
  const plainText =e.clipboardData.getData("text/plain");
  document.execCommand("insertText",false,plainText);
  linkify();
});
//link styling---
const linkStyle = document.createElement("style");
linkStyle.textContent = `
  #editorArea a {
    color: #1a73e8;          /* Google-style blue */
    text-decoration: underline;
    cursor: pointer;
  }

  #editorArea a:hover {
    color: #0d47a1;          /* darker blue on hover */
  }
`;
document.head.appendChild(linkStyle);
// Event listeners
document.getElementById("newPageBtn").onclick = createPage;
document.getElementById("editorArea").addEventListener("input", saveCurrentPage);
document.getElementById("pageTitle").addEventListener("input", saveCurrentPage);
document.getElementById("deletePageBtn").onclick = deleteCurrentPage;

renderPages();