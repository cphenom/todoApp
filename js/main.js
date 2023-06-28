console.log("starting...");
// hooking javascript variables to DOM
const menuCreate = document.getElementById("menucreate");
const menuManage = document.getElementById("menumanage");
const createTodosEl = document.getElementById("createtodos");
const displayTodosEl = document.getElementById("displaytodos");
const firstNameInput = document.querySelector("#firstname");
const lastNameInput = document.getElementById("lastname");
const submitBtn = document.getElementById("submit");
const textAreaInput = document.getElementById("textarea");
const displayTodos = document.getElementById(`displaytodos`);
const successLogo = document.getElementById("success-logo");
const successMsg = document.getElementById("success-msg");
const errLogo = document.getElementById("error-logo");
const errMsg = document.getElementById("err-msg");
const footer = document.getElementById("footer");
let id;
let err;
let todo={};
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// input variable
let firstName;
let lastName;
let textArea;

//html elements
let textDisplay;
let deleteBtn;
// some more html variables were created dynamicaly
// window['completedBtn' + todo.id]
// window['edit' + todo.id]
// window['marked' + todo.id]

// create menu to display create page and hide manage page
menuCreate.addEventListener("click", () => {
    createTodosEl.classList.add("block");
    displayTodosEl.classList.remove("flex");
    
});
// manage menu to display create page and hide manage page
menuManage.addEventListener("click", () => {
    createTodosEl.classList.remove("block");
    displayTodosEl.classList.add("flex");
    
});

// removing footer on input mode
function removeFooter(){
    firstName = firstNameInput.value;
    textArea = textAreaInput.value;
    lastName = lastNameInput.value;

    firstNameInput.addEventListener("click",() => {
        footer.classList.add("hide");

        firstNameInput.addEventListener("input",() => {
            if (firstNameInput.value){
                footer.classList.add("hide");
            }
            else{
                footer.classList.remove("hide");
            }  
        });
    });

    lastNameInput.addEventListener("click",() => {
        footer.classList.add("hide");

        lastNameInput.addEventListener("input",() => {
            if (lastNameInput.value){
                footer.classList.add("hide");
            }
            else{
                footer.classList.remove("hide");
            }  
        }); 
    });

    textAreaInput.addEventListener("click",() => {
        footer.classList.add("hide");

        textAreaInput.addEventListener("input",() => {
            if (textAreaInput.value){
                footer.classList.add("hide");
            }
            else{
                footer.classList.remove("hide");
            }  
        }); 
    });  
}
removeFooter();

// this check if any of the input fields are empty, if so the display an error logo and error message accordingly 
function errChecker(){
    if ((firstName==="") || (lastName==="") || (textArea==="")){
        errLogo.classList.add("block");
    }
    else{
        errLogo.classList.remove("block");
    }

    // if error exist clear the previous error to record new one then set error to false to check again
    if (err===true){
        errMsg.innerHTML="";
    }
    err = false;
   
    if (firstName===""){
        let firstNerrText = document.createElement("p");
        firstNerrText.innerText = "Please type in your First Name";
        errMsg.appendChild(firstNerrText);
        err = true;  
    }
    
    if (lastName===""){
        let lastNerrText = document.createElement("p");
        lastNerrText.innerText = "Please type in your Last Name";
        errMsg.appendChild(lastNerrText);
        err = true;
    }
    
    if (textArea===""){
        let errText = document.createElement("p");
        errText.innerText = "Please type in a TODO";
        errMsg.appendChild(errText);
        err = true;
    }
    
};

// this will create a todo object and add it to todos array
function addTodo(){
    
    todo = {
        firstName: firstName,
        lastName: lastName,
        id:id,
        checker: false,
        textArea: textArea
    };

    todos.push(todo);
};

// this will check if error is false and then 
// displaying sucess logo for 3 secs
// displaying success msg to add another todo
// removing success msg if it exist before adding success logo
function successChecker(){
    if (err===false){

        if ( successMsg.classList.contains("block")){
            successMsg.classList.remove("block");
        }
        successLogo.classList.add("block");
    
        function removeSuccessLogo(){
            successLogo.classList.remove("block");
            successMsg.classList.add("block");
            footer.classList.remove("hide");
        }
        setTimeout(removeSuccessLogo, 4000);
    
    };
};

function greet(){
     // greeting code 2 lines
     let greeting = document.querySelector(".greeting");
     greeting.innerText = `Hi ${firstName} ${lastName}`;
};

// this will clear displaywindow on manage page and create new todowindow, manage it by completing, editing and deleting it then update todo in todos array then store in local storage
function createAndManage(){

    displayTodos.innerHTML = "";

    todos = JSON.parse(localStorage.getItem("todos"));
    
    todos.forEach((todo) => {

        let todoWindow = document.createElement("div");
        todoWindow.classList.add('todowindow');
        todoWindow.innerHTML = `
            <div class="toolbar">
                <div class="complete">
                    <input type="checkbox" id="completed${todo.id}">
                </div>
                
                <button>
                    <i class="fa-solid fa-pen-to-square" id="edit${todo.id}"></i>
                </button>
                <button>
                    <i class="fa-solid fa-trash-can" id="delete${todo.id}"></i>
                </button>
                </div>
                <div class="marked" id="marked${todo.id}">
                    <i class="fa-solid fa-circle-check"></i><div class="font10">DONE</div>
                </div>
                <div id="nametag">
                    Todo By ${todo.firstName}
                </div>
            </div>
        `
        textDisplay = document.createElement("textarea");
        textDisplay.setAttribute("id", `textdisplay${todo.id}`);
        textDisplay.setAttribute("readonly", "");
        textDisplay.setAttribute("maxlength", "130");
        textDisplay.classList.add("textdisplay");
        textDisplay.textContent = todo.textArea;
        todoWindow.appendChild(textDisplay);

        // render todo window to display todos div on maange page (document)
        displayTodos.appendChild(todoWindow);

        window['marked' + todo.id] = document.getElementById(`marked${todo.id}`);

        window['textdisplay' + todo.id] = document.getElementById(`textdisplay${todo.id}`);

        window['edit' + todo.id] = document.getElementById(`edit${todo.id}`);

        window['completeBtn' + todo.id] = document.getElementById(`completed${todo.id}`);

        window['completeBtn' + todo.id].addEventListener("click", function(){

            // this will toggle checker value between true and false on every click for complete to be used to know if to edit or not toggle complete properties
            
            if (todo.checker === false){
                todo.checker = true;
                window['textdisplay' + todo.id].classList.add("line-through");
                window['marked' + todo.id].classList.add("block");
                if (window['edit' + todo.id].classList.contains("fa-square-check")){
                    window['edit' + todo.id].classList.remove("fa-bounce");
                    window['edit' + todo.id].classList.remove("fa-square-check");
                    window['edit' + todo.id].classList.add("fa-pen-to-square");
                    window['textdisplay' + todo.id].setAttribute("readonly", "");
                    window['textdisplay' + todo.id].classList.remove("edit-mode-bg");
                    footer.classList.remove("hide");
                 
                    // store edited text and render new todo to screen
                    console.log(window['textdisplay' + todo.id].value);
                    todo.textArea = window['textdisplay' + todo.id].value;
    
                    storeTodos();
                    createAndManage();
                    console.log(todo.textArea);
                    console.log(editMode);
                }
                
            }else{
                todo.checker = false;
                window['textdisplay' + todo.id].classList.remove("line-through");
        
                window['marked' + todo.id].classList.remove("block");
                
            };

            storeTodos();
            
        });

        window['edit' + todo.id].addEventListener("click", function(){
            editMode = false;
            if (todo.checker === false){

                if ( window['edit' + todo.id].classList.contains("fa-pen-to-square")){
                    window['edit' + todo.id].classList.remove("fa-pen-to-square");
                    window['edit' + todo.id].classList.add("fa-square-check");
                    window['edit' + todo.id].classList.add("fa-bounce");
                    window['textdisplay' + todo.id].removeAttribute("readonly");
                    window['textdisplay' + todo.id].classList.add("edit-mode-bg");
                    footer.classList.add("hide");
                    editMode = false;
                }
                else{
                    window['edit' + todo.id].classList.remove("fa-bounce");
                    window['edit' + todo.id].classList.remove("fa-square-check");
                    window['edit' + todo.id].classList.add("fa-pen-to-square");
                    window['textdisplay' + todo.id].setAttribute("readonly", "");
                    window['textdisplay' + todo.id].classList.remove("edit-mode-bg");
                    footer.classList.remove("hide");
                    editMode = true;
                };

            }
            console.log(editMode);
            if(editMode === true) {

                console.log(window['textdisplay' + todo.id].value);
                todo.textArea = window['textdisplay' + todo.id].value;

                storeTodos();
                createAndManage();
            };

        });

        deleteBtn = document.getElementById(`delete${todo.id}`);
        let idToDelete = `${todo.id}`;
        deleteBtn.addEventListener("click", function(){
            if (confirm("Do you really want to delete this todo? if you delete it you can no longer get it back")){
                deleteBtn.parentElement.parentElement.parentElement.remove();
                todos = todos.filter(todo => {
                    if (idToDelete === `${todo.id}`){
                        return false;
                    }else{
                        return true;
                    }
                });
                storeTodos();
                createAndManage();
            };
        });
        function completedTodo(){
            
            if (todo.checker === true){
                window['completeBtn' + todo.id].checked = true;
                window['textdisplay' + todo.id].classList.add("line-through");
                window['marked' + todo.id].classList.add("block");
                if (window['edit' + todo.id].classList.contains("fa-square-check")){
                    window['edit' + todo.id].classList.remove("fa-bounce");
                    window['edit' + todo.id].classList.remove("fa-square-check");
                    window['edit' + todo.id].classList.add("fa-pen-to-square");
                    window['textdisplay' + todo.id].setAttribute("readonly", "");
                    window['textdisplay' + todo.id].classList.remove("edit-mode-bg");
                    footer.classList.remove("hide");
                }
            }else{
                window['completeBtn' + todo.id].checked = false;
                window['textdisplay' + todo.id].classList.remove("line-through");
        
                window['marked' + todo.id].classList.remove("block");
            };
            
        };
        completedTodo();
    });
    
    
};

// this will update local storage with updated todos array
function storeTodos(){
    // store all updated todo in todos to the local storage
    localStorage.setItem("todos",JSON.stringify(todos));
};
// on clicking of submit button
submitBtn.addEventListener("click", () => {
    firstName = firstNameInput.value;
    textArea = textAreaInput.value;
    lastName = lastNameInput.value;
    id = "" + new Date().getTime();

    errChecker();
    if (err===true){
        return;
    };

    greet();
    
    addTodo();

    storeTodos();

    createAndManage();

    successChecker();

    // clearing the textarea on submiting todo
    textAreaInput.value = "";
    console.log("submitted....");
});

// this fucntion will check if todos exits from previous browser sessions and if so create todo from local storage by calling creeateAndManage() 
function loadLSTodos(){

    if (todos.length > 0){
        window.addEventListener("onunload",createAndManage());
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            if ( todos[todos.length-1] ){
                firstName = todo.firstName;
                lastName = todo.lastName;
                firstNameInput.value = todo.firstName;
                lastNameInput.value = todo.lastName;

                greet();
            };
        });
        
    };
};
loadLSTodos();
