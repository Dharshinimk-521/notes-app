let pages = [
  {
    id: "123",
    title: "My First Page",
    content: "<p>Hello world</p>"
  }
];
//storing as array in local storage :load pages
localStorage.setItem("pages",JSON.stringify(pages));
let pages =JSON.parse(localStorage.getItem("pages") || []);
let currpageId=null;

//create page
function createPage() {
    const newPage= {
        id : Date.now().toString();
        title:"Untitled",
        content: ""
    };
    pages.push(newPage)
    savePages();
    renderPages();
}

//render content in sidebarr
function renderPages() {
    const pageList= document.getElementById("pageList");
    pageList.innerHtml="";
    pages.forEach((page) => {
        li=document.createElement("li");
        li.textContent=page.title;
        li.onClick = () => openPage(page.id);
        pageList.appendChild(li)
    });
}
//open the page
function openPage() {
    const page=pages.findIndex(p => p.id===id);
    currpageId=id;
    document.getElementById("pageTitle").value=page.title;
    document.getElementById("editorArea").innerHtml= page.content;

}
//auto save func
function savePages() {
    const page=
}