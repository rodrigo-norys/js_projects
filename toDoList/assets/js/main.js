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

// Capturing value from input text.
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
let selectedTask;
let deleteButton;
function createDeleteButton() {
    selectedTask = document.getElementById(`task${counter}`);
    deleteButton = document.createElement("button");
    
    deleteButton.textContent = "Delete Task";
    deleteButton.setAttribute(`id`, `deleteTask${counter}`);
    selectedTask.appendChild(deleteButton);
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
let deleteTaskID;
function deleteEventClick() {
    deleteTaskID = document.querySelector(`#deleteTask${counter}`);
    deleteTaskID.addEventListener("click", deleteTask);
};

// Loop to show items added inside Local Storage.
for (counter; counter < taskArray.length; counter++) {
    createLi().textContent = `${taskArray[counter]}`;
    selectedTask = document.getElementById(`task${counter}`);
    deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete Task";
    deleteButton.setAttribute(`id`, `deleteTask${counter}`);
    selectedTask.appendChild(deleteButton);

    deleteTaskID = document.querySelector(`#deleteTask${counter}`);
    deleteTaskID.addEventListener("click", deleteTask);
}