// Inicialization of arrays tasks
let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

// li's creater function.
function createLi(index) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");

    li.setAttribute("id", `task${index}`);
    li.setAttribute("data-index", index);

    return taskList.appendChild(li);
}

// Capturing value from task input text.
const taskInputText = document.getElementById("taskInputText");
function captureTask() {
    return taskInputText.value;
}

// ADD BUTTON ENGINE.
document.getElementById("addButton").addEventListener("click", addButton);
function addButton() {
    const currentIndex = taskArray.length;

    const li = createLi(currentIndex);
    li.textContent = captureTask();

    taskArray.push(captureTask());
    localStorage.setItem("tasks", JSON.stringify(taskArray));

    createDeleteButton(currentIndex);
    deleteEventClick(currentIndex);
}

// CREATE DELETE BUTTON.
function createDeleteButton(index) {
    const selectedTask = document.getElementById(`task${index}`);
    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete Task";
    deleteButton.setAttribute("id", `deleteTask${index}`);

    selectedTask.appendChild(deleteButton);
}

// CAPTURER AND LISTENER OF CLICK'S DELETE EVENT.
function deleteEventClick(index) {
    const deleteTaskButton = document.getElementById(`deleteTask${index}`);
    if (deleteTaskButton) {
        deleteTaskButton.addEventListener("click", deleteTask);
    }
}

// DELETE TASK ENGINE.
function deleteTask(event) {
    const li = event.target.parentElement;
    const index = Number(li.dataset.index);

    li.remove();
    taskArray.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskArray));

    // Re-renderiza a lista para atualizar os índices e eventos.
    renderTasks();
}

// RENDER ALL TASKS.
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Need to be clean before loop's structure.

    // Better than last for...
    taskArray.forEach((task, index) => {
        const li = createLi(index);
        li.textContent = task;

        createDeleteButton(index);
        deleteEventClick(index);
    });
}

// INIT LOCALSTORAGE TASKS.
renderTasks();
