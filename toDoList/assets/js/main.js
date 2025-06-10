let counter = 0;
// li's creater function.
function createLi() {
    // Ul Element.
    const taskList = document.getElementById("taskList");
    // Creating li element.
    const containerItemTask = document.createElement("li");
    // Setting IDs dinamically.
    containerItemTask.setAttribute(`id`, `task${counter + 1}`);
    
    return taskList.appendChild(containerItemTask);
}

// Capturing the value from input text.
const taskInputText = document.getElementById("taskInputText");
taskInputText.addEventListener("input", captureTask);
function captureTask() {
    return taskInputText.value
}

// ADD BUTTON ENGINE.
document.getElementById("addButton").addEventListener("click",addButton);
function addButton() {
    createLi().textContent = `${captureTask()}  `;
    
    counter++;
    createDeleteButton(counter);

    return null;
};

// CREATE DELETE BUTTON.
function createDeleteButton() {
    const localDeleteButton = document.querySelector(`#task${counter}`);
    const deleteButton = document.createElement("button");
    
    localDeleteButton.appendChild(deleteButton);
    deleteButton.textContent = "Delete Task";
    deleteButton.setAttribute(`id`, `deleteTask${counter}`);
    
    const deleteTaskID = document.getElementById(`deleteTask${counter}`);
    deleteTaskID.addEventListener("click", deleteTask);
}

// DELETING TASKS ENGINE.
function deleteTask(event) {
  const li = event.target.parentElement;
  li.remove();
}