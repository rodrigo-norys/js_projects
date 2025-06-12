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
let taskArray = JSON.parse(localStorage.getItem('tasks')) || [];


document.getElementById("addButton").addEventListener("click",addButton);
function addButton() {
    createLi().textContent = captureTask();
    
    taskArray.push(captureTask())
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    
    counter++;
    createDeleteButton();
    
    deleteEventClick();
};

for (counter; counter < taskArray.length; counter++) {
    createLi().textContent = `${taskArray[counter]}`;
}

// CREATE DELETE BUTTON.
function createDeleteButton() {
    const localDeleteButton = document.querySelector(`#task${counter}`);
    const deleteButton = document.createElement("button");
    
    localDeleteButton.appendChild(deleteButton);
    deleteButton.textContent = "Delete Task";
    deleteButton.setAttribute(`id`, `deleteTask${counter}`);
    console.log(localDeleteButton);
    return null;
}

// DELETE TASK ENGINE.
function deleteTask(event) {
    const li = event.target.parentElement;
    li.remove();
    return null;
}

// CAPTURER AND LISTENER OF CLICK'S EVENT.
function deleteEventClick(event) {
    const deleteTaskID = document.getElementById(`deleteTask${counter}`);
    return deleteTaskID.addEventListener("click", deleteTask);
};