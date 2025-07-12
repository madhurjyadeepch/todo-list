const input = document.querySelector('.task-input-section');
const button = document.querySelector('.new-task-button');
const taskContainer = document.querySelector('.task-container');

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

const tasks = loadTasksFromLocalStorage();

tasks.forEach( task => {
    createTaskElement(task.text, task.completed) 
});

function createTaskElement (text, completed=false) {
    const taskLi = document.createElement('li');
    taskLi.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-check');
    checkbox.checked = completed;

    const taskName = document.createElement('p');
    taskName.classList.add('task-name');
    taskName.textContent = text;
    if (completed) {
        taskName.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('delete-button');

    checkbox.addEventListener('change', () => {
        taskName.classList.toggle('completed');
        updateTaskInLocalStorage (text, checkbox.checked)
    });

    deleteButton.addEventListener('click', () => {
        taskLi.remove();
        deleteTaskFromLocalStorage(text);
    })

    taskLi.appendChild(checkbox);
    taskLi.appendChild(taskName);
    taskLi.appendChild(deleteButton);

    taskContainer.appendChild(taskLi);
};

function addTasksToLocalStorage (text){
    const tasks = loadTasksFromLocalStorage();
    tasks.push({text, completed: false});
    saveTasksToLocalStorage(tasks);
}

function updateTaskInLocalStorage(text, completed) {
    const tasks = loadTasksFromLocalStorage();
    const task = tasks.find( t => t.text === text);
    if (task) {
        task.completed = completed;
        saveTasksToLocalStorage(tasks);
    }
}

function deleteTaskFromLocalStorage (text) {
    const tasks = loadTasksFromLocalStorage();
    const newTasks = tasks.filter(t => t.text !== text);
    saveTasksToLocalStorage(newTasks);
}   

button.addEventListener('click', () => {
    const textInput = input.value.trim();
    if (textInput === '') return;

    createTaskElement (textInput);
    addTasksToLocalStorage(textInput);

    input.value = '';
});