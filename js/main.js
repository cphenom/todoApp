console.log("starting...");
const menuCreate = document.getElementById("menucreate");
const menuManage = document.getElementById("menumanage");
const createTodosEl = document.getElementById("createtodos");
const displayTodosEl = document.getElementById("displaytodos");
let firstNameInput = document.querySelector("#firstname");
const lastNameInput = document.getElementById("lastname");
const submitBtn = document.getElementById("submit");
const textAreaInput = document.getElementById("textarea");
let id = 0;


let firstName;
let lastName;
let textArea;

menuCreate.addEventListener("click", () => {
    createTodosEl.classList.add("block");
    displayTodosEl.classList.remove("flex");
    
});
menuManage.addEventListener("click", () => {
    createTodosEl.classList.remove("block");
    displayTodosEl.classList.add("flex");
    
});

submitBtn.addEventListener("click", () => {
    firstName = firstNameInput.value;
    textArea = textAreaInput.value;
    lastName = lastNameInput.value;
    id++;

    let greeting = document.querySelector(".greeting");
    greeting.innerText = `Hi ${firstName} ${lastName}`;
    let todoWindow = document.createElement("div");
    todoWindow.classList.add('todowindow');
    todoWindow.innerHTML = `
        <div class="toolbar">
            <div class="complete">
                <input type="checkbox" id="completed${id}">
            </div>
            
            <button>
                <i class="fa-solid fa-pen-to-square" id="edit${id}"></i>
            </button>
            <button>
                <i class="fa-solid fa-trash-can" id="delete${id}"></i>
            </button>
            </div>
            <div class="marked" id="marked${id}">
                <i class="fa-solid fa-circle-check"></i><div class="font10">DONE</div>
            </div>
            <div id="nametag">
                Todo By ${firstName}
            </div>
        </div>
    `
    let textDisplay = document.createElement("textarea");
    textDisplay.setAttribute("id", `textdisplay${id}`);
    textDisplay.setAttribute("readonly", "");
    textDisplay.setAttribute("maxlength", "130");
    textDisplay.classList.add("textdisplay");
    textDisplay.innerText = textArea;
    todoWindow.appendChild(textDisplay);

    let displayTodos = document.getElementById(`displaytodos`);
    displayTodos.appendChild(todoWindow);

    let marked = document.getElementById(`marked${id}`);

    let completedBtn = document.getElementById(`completed${id}`);
    completedBtn.addEventListener("click", function(){
        completedBtn.parentElement.parentElement.parentElement.lastChild.classList.toggle("line-through");
        
        marked.classList.toggle("block");
    });

    let edit = document.getElementById(`edit${id}`);
    edit.addEventListener("click", function(){
        if ( edit.classList.contains("fa-pen-to-square")){
            edit.classList.remove("fa-pen-to-square");
            edit.classList.add("fa-square-check");
            edit.classList.add("fa-bounce");
            textDisplay.removeAttribute("readonly");
            textDisplay.classList.add("edit-mode-bg");
        }
        else{
            edit.classList.remove("fa-bounce");
            edit.classList.remove("fa-square-check");
            edit.classList.add("fa-pen-to-square");
            textDisplay.setAttribute("readonly", "");
            textDisplay.classList.remove("edit-mode-bg");
        }
        // edit.parentElement.innerHTML = `<i class="fa-solid fa-trash-can" id="edit${id}"></i>`;
        
        console.log("hello");
    });

    let deleteBtn = document.getElementById(`delete${id}`);
    deleteBtn.addEventListener("click", function(){
        deleteBtn.parentElement.parentElement.parentElement.remove();
    });
    
    console.log("testing" + " "+ firstName + " " + lastName + " " + textArea);

    // firstNameInput.value = "";
    // lastNameInput.value = "";
    textAreaInput.value = "";

    createTodosEl.classList.remove("block");
    displayTodosEl.classList.add("flex");

    console.log("End....");
});