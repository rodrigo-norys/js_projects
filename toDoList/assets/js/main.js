let counter = 0;

// li's creater function.
function createLi() {
    // Ul Element.
    const taskList = document.getElementById("taskList");
    // Creating li element.
    const containerItemTask = document.createElement("li");
    // Setting IDs dinamically.
    containerItemTask.setAttribute(`id`, `task${counter}`);
    containerItemTask.setAttribute("data-index", counter);
    return taskList.appendChild(containerItemTask);
}

// Capturing the value from input text.
const taskInputText = document.getElementById("taskInputText");
taskInputText.addEventListener("input", captureTask);
function captureTask() {
    return taskInputText.value
}

// ADD BUTTON ENGINE.
let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
document.getElementById("addButton").addEventListener("click", addButton);
function addButton() {
    createLi().textContent = captureTask();
    
    taskArray.push(captureTask())
    localStorage.setItem("tasks", JSON.stringify(taskArray));

    createDeleteButton();
    
    deleteEventClick();
    counter++;

};

// CREATE DELETE BUTTON.
function createDeleteButton() {
    const localDeleteButton = document.getElementById(`task${counter}`);
    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete Task";
    deleteButton.setAttribute(`id`, `deleteTask${counter}`);
    return localDeleteButton.appendChild(deleteButton);
}

for (counter; counter < taskArray.length; counter++) {
    createLi().textContent = `${taskArray[counter]}`;
    const localDeleteButton = document.getElementById(`task${counter}`);
    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete Task";
    deleteButton.setAttribute(`id`, `deleteTask${counter}`);
    localDeleteButton.appendChild(deleteButton);
    
    const deleteTaskID = document.querySelector(`#deleteTask${counter}`);
    deleteTaskID.addEventListener("click", deleteTask);
}

// DELETE TASK ENGINE.
function deleteTask(event) {
    const li = event.target.parentElement;
    const index = Number(li.dataset.index);

    taskArray.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(taskArray));

    li.remove();
    
}

// CAPTURER AND LISTENER OF CLICK'S DELETE EVENT.
function deleteEventClick() {
    const deleteTaskID = document.querySelector(`#deleteTask${counter}`);

    deleteTaskID.addEventListener("click", deleteTask);
};