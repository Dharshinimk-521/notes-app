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

//render content
function renderPages() {
    const pageList= document.getElementById("pageList");

    pages.forEach((page) => {
        
    })
}