console.log("starting...");
// hooking to dom
const menuCreate = document.getElementById("menucreate");
const menuManage = document.getElementById("menumanage");
const createTodosEl = document.getElementById("createtodos");
const displayTodosEl = document.getElementById("displaytodos");
let firstNameInput = document.querySelector("#firstname");
const lastNameInput = document.getElementById("lastname");
const submitBtn = document.getElementById("submit");
const textAreaInput = document.getElementById("textarea");
let successLogo = document.getElementById("success-logo");
let successMsg = document.getElementById("success-msg");
let errLogo = document.getElementById("error-logo");
let errMsg = document.getElementById("err-msg");
let footer = document.getElementById("footer");
let id = 0;
let err;

// input variable
let firstName;
let lastName;
let textArea;

// create menu
menuCreate.addEventListener("click", () => {
    createTodosEl.classList.add("block");
    displayTodosEl.classList.remove("flex");
    
});
// manage menu
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

// on clicking of submit button
submitBtn.addEventListener("click", () => {
    firstName = firstNameInput.value;
    textArea = textAreaInput.value;
    lastName = lastNameInput.value;
    id++;

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
    if (err===true){
        return;
    }

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

    let checker = false;


    let edit = document.getElementById(`edit${id}`);
    let completedBtn = document.getElementById(`completed${id}`);
    completedBtn.addEventListener("click", function(){
        completedBtn.parentElement.parentElement.parentElement.lastChild.classList.toggle("line-through");
        
        marked.classList.toggle("block");
        // this will toggle checker value between true and false on every click for complete to be used to know if to edit or not

        if (edit.classList.contains("fa-square-check")){
            edit.classList.remove("fa-bounce");
            edit.classList.remove("fa-square-check");
            edit.classList.add("fa-pen-to-square");
            textDisplay.setAttribute("readonly", "");
            textDisplay.classList.remove("edit-mode-bg");
            footer.classList.remove("hide");
        }

        if (checker === false){
            return checker = true;
        }else{
            return checker = false;
        }
    });

    edit.addEventListener("click", function(){
        
        if (checker === false){

            if ( edit.classList.contains("fa-pen-to-square")){
                edit.classList.remove("fa-pen-to-square");
                edit.classList.add("fa-square-check");
                edit.classList.add("fa-bounce");
                textDisplay.removeAttribute("readonly");
                textDisplay.classList.add("edit-mode-bg");
                footer.classList.add("hide");
            }
            else{
                edit.classList.remove("fa-bounce");
                edit.classList.remove("fa-square-check");
                edit.classList.add("fa-pen-to-square");
                textDisplay.setAttribute("readonly", "");
                textDisplay.classList.remove("edit-mode-bg");
                footer.classList.remove("hide");
            }

        }
        
    });

    let deleteBtn = document.getElementById(`delete${id}`);
    deleteBtn.addEventListener("click", function(){
        if (confirm("Do you really want to delete this todo? if you delete it you can no longer get it back")){
            deleteBtn.parentElement.parentElement.parentElement.remove();
        };
    });
    
    console.log("testing" + " "+ firstName + " " + lastName + " " + textArea);

// displaying sucess logo for 3 secs
// displaying success msg to add another todo
// removing success msg if it exist before adding success logo
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
    
// end of success display

// clearing the textarea on submiting todo
textAreaInput.value = "";
    console.log("submitted....");
});