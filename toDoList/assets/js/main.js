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
    const localDeleteButton2 = document.getElementById(`task${counter+1}`);
    const deleteButton2 = document.createElement("button");
    
    deleteButton2.textContent = "Delete Task";
    deleteButton2.setAttribute(`id`, `deleteTask${counter+1}`);
    localDeleteButton2.appendChild(deleteButton2);
}

// taskArray.forEach(() => {
//     // index === o índice
//     // tarefa === o conteúdo
//     createLi().textContent = `${taskArray[counter]}`;

// });

// CREATE DELETE BUTTON.
function createDeleteButton() {
    const localDeleteButton = document.getElementById(`task${counter}`);
    const deleteButton = document.createElement("button");
    
    deleteButton.textContent = "Delete Task";
    deleteButton.setAttribute(`id`, `deleteTask${counter}`);
    return localDeleteButton.appendChild(deleteButton);
}

// DELETE TASK ENGINE.
function deleteTask(event) {
    const li = event.target.parentElement;
    li.remove();
    return null;
}

// CAPTURER AND LISTENER OF CLICK'S EVENT.
function deleteEventClick() {
    const deleteTaskID = document.querySelector(`#deleteTask${counter}`);
    return deleteTaskID.addEventListener("click", deleteTask);
};