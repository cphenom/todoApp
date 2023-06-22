console.log("starting...");
const menuCreate = document.getElementById("menucreate");
const menuManage = document.getElementById("menumanage");
const createTodosEl = document.getElementById("createtodos");
const displayTodosEl = document.getElementById("displaytodos");
let firstNameInput = document.querySelector("#firstname");
const lastNameInput = document.getElementById("lastname");
const submitBtn = document.getElementById("submit");
const textAreaInput = document.getElementById("textarea");




menuCreate.addEventListener("click", () => {
    createTodosEl.classList.add("visible");
    displayTodosEl.classList.remove("flex");
    
});
menuManage.addEventListener("click", () => {
    createTodosEl.classList.remove("visible");
    displayTodosEl.classList.add("flex");
    
});

submitBtn.addEventListener("click", () => {
    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;
    let textArea = textAreaInput.value;
    

    console.log("testing" + " "+ firstName + " " + lastName + " " + textArea)
    console.log("testing" + " " + " " + textArea)
})