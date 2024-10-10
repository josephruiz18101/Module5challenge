// Retrieve tasks and nextId from localStorage or initialize them
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  let backgroundColor;

  // Determine the background color based on the task's status
  switch (task.status) {
    case "To Do":
      backgroundColor = 'red';
      break;
    case "In Progress":
      backgroundColor = 'yellow';
      break;
    case "Done":
      backgroundColor = 'green';
      break;
    default:
      backgroundColor = 'white'; // Fallback color
  }

  const card = $(`
    <div class="task-card card mb-2" data-id="${task.id}" style="background-color: ${backgroundColor};">
      <div class="card-body">
        <h4 class="card-title"><strong>${task.title}</strong></h4>
        <p class="card-text">${task.description}</p>
        <p class="card-text"><small style="color: black;">Due: ${dayjs(task.dueDate).format('YYYY-MM-DD')}</small></p>
        <button class="btn btn-danger delete-task">Delete</button>
      </div>
    </div>
  `);
  card.draggable({
    revert: "invalid",
    start: function(event, ui) {
      $(this).addClass('dragging');
    },
    stop: function(event, ui) {
      $(this).removeClass('dragging');
    }
  });
  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $('#todo-cards, #in-progress-cards, #done-cards').empty();
  taskList.forEach(task => {
    const card = createTaskCard(task);
    const column = task.status === "To Do" ? '#todo-cards' : (task.status === "In Progress" ? '#in-progress-cards' : '#done-cards');
    $(column).append(card);
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const newTask = {
    id: generateTaskId(),
    title: $('#taskTitle').val(),
    description: $('#taskDescription').val(),
    dueDate: new Date($('#taskDeadline').val()).getTime(),
    status: "To Do"
  };
  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", nextId);
  renderTaskList();
  $('#formModal').modal('hide');
  $('#taskForm')[0].reset();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = $(event.target).closest('.task-card').data('id');
  taskList = taskList.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = $(ui.draggable).data('id');
  const newStatus = $(this).data('status');
  const task = taskList.find(t => t.id === taskId);
  task.status = newStatus;
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  $('#taskForm').on('submit', handleAddTask);
  $(document).on('click', '.delete-task', handleDeleteTask);

  $('.lane').droppable({
    accept: '.task-card',
    drop: handleDrop
  });
});
