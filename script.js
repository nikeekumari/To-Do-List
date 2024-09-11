const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach(task => addTaskToUI(task));
}

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
    }
});

function addTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskTextElement = document.createElement('span');
    taskTextElement.classList.add('task-text');
    taskTextElement.textContent = taskText;
    taskItem.appendChild(taskTextElement);

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(taskItem));
    taskActions.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(taskItem));
    taskActions.appendChild(deleteBtn);

    taskItem.appendChild(taskActions);
    taskList.appendChild(taskItem);
    saveTasks();
}

function editTask(taskItem) {
    const taskTextElement = taskItem.querySelector('.task-text');
    const newText = prompt('Enter new task text:', taskTextElement.textContent);
    if (newText) {
        taskTextElement.textContent = newText;
        saveTasks();
    }
}

function deleteTask(taskItem) {
    taskList.removeChild(taskItem);
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    taskList.childNodes.forEach(taskItem => {
        const taskText = taskItem.querySelector('.task-text').textContent;
        tasks.push(taskText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}