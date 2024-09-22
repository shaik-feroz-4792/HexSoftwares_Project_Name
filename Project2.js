// Get the DOM elements
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
window.onload = loadTasks;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    createTaskElement(taskText, false);
    saveTask(taskText, false);
    taskInput.value = ''; // Clear input
}

// Create a task DOM element
function createTaskElement(taskText, completed) {
    const li = document.createElement('li');
    li.className = completed ? 'completed' : '';
    
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskText}</span>
        <button class="remove" onclick="removeTask(this)">Remove</button>
    `;
    taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(button) {
    const li = button.parentNode;
    const taskText = li.querySelector('span').textContent;
    li.remove();
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Toggle task completion
function toggleComplete(span) {
    const li = span.parentNode;
    li.classList.toggle('completed');
    
    const taskText = span.textContent;
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
