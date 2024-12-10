// Reference to UI elements
const taskInput = document.getElementById('taskInput');
const priorityInput = document.getElementById('priorityInput');
const addTaskButton = document.getElementById('addTaskButton');
const searchInput = document.getElementById('searchInput');
const pendingTasks = document.getElementById('pendingTasks');
const completedTasks = document.getElementById('completedTasks');

// Event Listeners
addTaskButton.addEventListener('click', addTask);
searchInput.addEventListener('input', searchTasks);

/**
 * Adds a new task to the pending tasks list
 */
function addTask() {
  const taskText = taskInput.value.trim();
  const priority = priorityInput.value;

  if (!taskText) {
    alert('Task cannot be empty!');
    return;
  }

  const taskItem = createTaskElement(taskText, priority);
  pendingTasks.appendChild(taskItem);

  // Clear input field
  taskInput.value = '';
}

/**
 * Creates a task element with priority and action buttons
 */
function createTaskElement(taskText, priority) {
  // Task container
  const li = document.createElement('li');

  // Priority tag
  const priorityTag = document.createElement('span');
  priorityTag.textContent = priority.toUpperCase();
  priorityTag.className = `priority ${priority}`;

  // Task text
  const textSpan = document.createElement('span');
  textSpan.textContent = taskText;

  li.appendChild(priorityTag);
  li.appendChild(textSpan);

  // Action buttons
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'task-actions';

  // Complete button
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.className = 'complete-btn';
  completeButton.addEventListener('click', () => {
    li.classList.add('completed');
    completedTasks.appendChild(li);
    completeButton.remove(); // Remove "Complete" button
  });

  // Edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'edit-btn';
  editButton.addEventListener('click', () => {
    const newTaskText = prompt('Edit task:', textSpan.textContent);
    if (newTaskText !== null && newTaskText.trim() !== '') {
      textSpan.textContent = newTaskText.trim();
    }
  });

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-btn';
  deleteButton.addEventListener('click', () => {
    li.remove();
  });

  actionsDiv.appendChild(completeButton);
  actionsDiv.appendChild(editButton);
  actionsDiv.appendChild(deleteButton);
  li.appendChild(actionsDiv);

  return li;
}

/**
 * Filters tasks based on the search query
 */
function searchTasks(event) {
  const query = event.target.value.toLowerCase();

  // Filter pending tasks
  filterTaskList(pendingTasks, query);

  // Filter completed tasks
  filterTaskList(completedTasks, query);
}

/**
 * Filters a given task list based on a query
 */
function filterTaskList(taskList, query) {
  const tasks = taskList.querySelectorAll('li');
  tasks.forEach(task => {
    const taskText = task.textContent.toLowerCase();
    if (taskText.includes(query)) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });
}
