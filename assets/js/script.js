// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateUniqueTaskId() {
    // Get the current timestamp
    const timestamp = Date.now();
    
    // Generate a random number between 0 and 1000
    const randomNum = Math.floor(Math.random() * 1000);
    
    // Combine timestamp and random number to create a unique ID
    const uniqueId = `task-${timestamp}-${randomNum}`;
    
    return uniqueId;
  }
  
  // Get the modal
  var modal = document.getElementById("taskModal");
  
  // Get the button that opens the modal
  var btn = document.getElementById("openModal");
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  
  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
  // Handle form submission
  document.getElementById("taskForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Generate a unique task ID
    const taskId = generateUniqueTaskId();
    
    // Get the task name and description
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    
    // Logic to add the task with the unique ID
    console.log("Task ID:", taskId);
    console.log("Task Name:", taskName);
    console.log("Description:", taskDescription);
    
    // Close the modal after submission
    modal.style.display = "none"; 
  };
// Todo: create a function to create a task card
function createTaskCard(taskId, taskName, taskDescription) {
    // Create a new div element for the task card
    const taskCard = document.createElement("div");
    taskCard.className = "task-card"; // Add a class for styling
    taskCard.id = taskId; // Set the ID of the card to the unique task ID
  
    // Create the content of the task card
    taskCard.innerHTML = `
      <h3>${taskName}</h3>
      <p>${taskDescription}</p>
      <button class="delete-button">Delete</button>
    `;
  
    // Append the task card to the task list container
    const taskList = document.getElementById("taskList"); // Change this to your actual container ID
    taskList.appendChild(taskCard);
  
    // Add event listener for the delete button
    const deleteButton = taskCard.querySelector(".delete-button");
    deleteButton.onclick = function() {
      taskList.removeChild(taskCard); // Remove the task card from the list
    };
  }
  
  // Example usage (you can call this in the form submission logic)
  document.getElementById("taskForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Generate a unique task ID
    const taskId = generateUniqueTaskId();
    
    // Get the task name and description
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    
    // Create the task card
    createTaskCard(taskId, taskName, taskDescription);
    
    // Close the modal after submission
    modal.style.display = "none"; 
  };
// Todo: create a function to render the task list and make cards draggable
// Array to hold tasks (for demonstration purposes)
let tasks = [];

// Function to create a task card
function createTaskCard(taskId, taskName, taskDescription) {
  const taskCard = document.createElement("div");
  taskCard.className = "task-card"; // Add a class for styling
  taskCard.id = taskId; // Set the ID of the card to the unique task ID
  taskCard.setAttribute("draggable", "true"); // Make the card draggable

  taskCard.innerHTML = `
    <h3>${taskName}</h3>
    <p>${taskDescription}</p>
    <button class="delete-button">Delete</button>
  `;

  // Append the task card to the task list container
  const taskList = document.getElementById("taskList");
  taskList.appendChild(taskCard);

  // Add event listener for the delete button
  const deleteButton = taskCard.querySelector(".delete-button");
  deleteButton.onclick = function() {
    taskList.removeChild(taskCard); // Remove the task card from the list
    // Remove the task from the tasks array
    tasks = tasks.filter(task => task.id !== taskId);
  };

  // Add drag and drop event listeners
  taskCard.ondragstart = function(event) {
    event.dataTransfer.setData("text/plain", taskId); // Set the ID of the dragged card
  };

  taskCard.ondragover = function(event) {
    event.preventDefault(); // Prevent default to allow drop
  };

  taskCard.ondrop = function(event) {
    const draggedTaskId = event.dataTransfer.getData("text/plain");
    const draggedCard = document.getElementById(draggedTaskId);
    if (draggedCard !== taskCard) {
      // Move the dragged card before the current card
      taskList.insertBefore(draggedCard, taskCard);
    }
  };
}

// Function to render the task list
function renderTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear the existing task list

  tasks.forEach(task => {
    createTaskCard(task.id, task.name, task.description);
  });
}

// Handle form submission
document.getElementById("taskForm").onsubmit = function(event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Generate a unique task ID
  const taskId = generateUniqueTaskId();
  
  // Get the task name and description
  const taskName = document.getElementById("taskName").value;
  const taskDescription = document.getElementById("taskDescription").value;

  // Add the task to the tasks array
  tasks.push({ id: taskId, name: taskName, description: taskDescription });

  // Create the task card
  createTaskCard(taskId, taskName, taskDescription);
  
  // Close the modal after submission
  modal.style.display = "none"; 
};
// Todo: create a function to handle adding a new task
function addNewTask() {
    // Generate a unique task ID
    const taskId = generateUniqueTaskId();
    
    // Get the task name and description from the form
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
  
    // Create a task object
    const newTask = {
      id: taskId,
      name: taskName,
      description: taskDescription
    };
  
    // Add the new task to the tasks array
    tasks.push(newTask);
  
    // Create the task card
    createTaskCard(taskId, taskName, taskDescription);
    
    // Clear the form fields
    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
  
    // Close the modal after submission
    modal.style.display = "none"; 
  }
  
  // Handle form submission
  document.getElementById("taskForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission
    addNewTask(); // Call the function to add a new task
  };

// Todo: create a function to handle deleting a task
function deleteTask(taskId) {
    // Find the task card by ID and remove it from the DOM
    const taskCard = document.getElementById(taskId);
    if (taskCard) {
      taskCard.remove(); // Remove the task card from the DOM
    }
  
    // Update the tasks array to remove the deleted task
    tasks = tasks.filter(task => task.id !== taskId);
  }
  
  // Update the createTaskCard function to include delete functionality
  function createTaskCard(taskId, taskName, taskDescription) {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card"; // Add a class for styling
    taskCard.id = taskId; // Set the ID of the card to the unique task ID
    taskCard.setAttribute("draggable", "true"); // Make the card draggable
  
    taskCard.innerHTML = `
      <h3>${taskName}</h3>
      <p>${taskDescription}</p>
      <button class="delete-button">Delete</button>
    `;
  
    // Append the task card to the task list container
    const taskList = document.getElementById("taskList");
    taskList.appendChild(taskCard);
  
    // Add event listener for the delete button
    const deleteButton = taskCard.querySelector(".delete-button");
    deleteButton.onclick = function() {
      deleteTask(taskId); // Call the delete function
    };
  
    // Add drag and drop event listeners (as before)
    taskCard.ondragstart = function(event) {
      event.dataTransfer.setData("text/plain", taskId); // Set the ID of the dragged card
    };
  
    taskCard.ondragover = function(event) {
      event.preventDefault(); // Prevent default to allow drop
    };
  
    taskCard.ondrop = function(event) {
      const draggedTaskId = event.dataTransfer.getData("text/plain");
      const draggedCard = document.getElementById(draggedTaskId);
      if (draggedCard !== taskCard) {
        // Move the dragged card before the current card
        taskList.insertBefore(draggedCard, taskCard);
      }
    };
  }

// Todo: create a function to handle dropping a task into a new status lane
function allowDrop(event) {
    event.preventDefault(); // Prevent default behavior to allow drop
  }
  
  // Function to handle dropping a task into a new status lane
  function drop(event, newStatus) {
    event.preventDefault(); // Prevent default behavior
  
    const taskId = event.dataTransfer.getData("text/plain"); // Get the ID of the dragged task
    const taskCard = document.getElementById(taskId); // Get the task card element
  
    if (taskCard) {
      // Move the task card to the new lane
      const targetLane = event.target; // The lane where the task is dropped
      targetLane.appendChild(taskCard); // Append the task card to the new lane
  
      // Update the task's status in the tasks array
      const task = tasks.find(task => task.id === taskId);
      if (task) {
        task.status = newStatus; // Update the status of the task
        console.log(`Task ${taskId} moved to ${newStatus}`);
      }
    }
  }
  
  // Update the createTaskCard function to include the draggable attribute
  function createTaskCard(taskId, taskName, taskDescription) {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card"; // Add a class for styling
    taskCard.id = taskId; // Set the ID of the card to the unique task ID
    taskCard.setAttribute("draggable", "true"); // Make the card draggable
  
    taskCard.innerHTML = `
      <h3>${taskName}</h3>
      <p>${taskDescription}</p>
      <button class="delete-button">Delete</button>
    `;
  
    // Append the task card to the default lane (e.g., To Do)
    const toDoLane = document.getElementById("toDoLane");
    toDoLane.appendChild(taskCard);
  
    // Add event listener for the delete button
    const deleteButton = taskCard.querySelector(".delete-button");
    deleteButton.onclick = function() {
      deleteTask(taskId); // Call the delete function
    };
  
    // Add drag and drop event listeners
    taskCard.ondragstart = function(event) {
      event.dataTransfer.setData("text/plain", taskId); // Set the ID of the dragged card
    };
  }
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker

// Function to create a task card
function createTaskCard(taskId, taskName, taskDescription, dueDate) {
  const taskCard = document.createElement("div");
  taskCard.className = "task-card"; // Add a class for styling
  taskCard.id = taskId; // Set the ID of the card to the unique task ID
  taskCard.setAttribute("draggable", "true"); // Make the card draggable

  taskCard.innerHTML = `
    <h3>${taskName}</h3>
    <p>${taskDescription}</p>
    <p>Due Date: ${dueDate}</p> <!-- Display due date -->
    <button class="delete-button">Delete</button>
  `;

  // Append the task card to the default lane (e.g., To Do)
  const toDoLane = document.getElementById("toDoLane");
  toDoLane.appendChild(taskCard);

  // Add event listener for the delete button
  const deleteButton = taskCard.querySelector(".delete-button");
  deleteButton.onclick = function() {
    deleteTask(taskId); // Call the delete function
  };

  // Add drag and drop event listeners
  taskCard.ondragstart = function(event) {
    event.dataTransfer.setData("text/plain", taskId); // Set the ID of the dragged card
  };
}

// Function to allow dropping
function allowDrop(event) {
  event.preventDefault(); // Prevent default behavior to allow drop
}

// Function to handle dropping a task into a new status lane
function drop(event, newStatus) {
  event.preventDefault(); // Prevent default behavior

  const taskId = event.dataTransfer.getData("text/plain"); // Get the ID of the dragged task
  const taskCard = document.getElementById(taskId); // Get the task card element

  if (taskCard) {
    // Move the task card to the new lane
    const targetLane = event.target; // The lane where the task is dropped
    targetLane.appendChild(taskCard); // Append the task card to the new lane

    // Update the task's status in the tasks array
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      task.status = newStatus; // Update the status of the task
      console.log(`Task ${taskId} moved to ${newStatus}`);
    }
  }
}

// Function to handle adding a new task
function addNewTask() {
  // Generate a unique task ID
  const taskId = generateUniqueTaskId();
  
  // Get the task name and description from the form
  const taskName = document.getElementById("taskName").value;
  const taskDescription = document.getElementById("taskDescription").value;
  const dueDate = document.getElementById("dueDate").value; // Get due date

  // Create a task object
  const newTask = {
    id: taskId,
    name: taskName,
    description: taskDescription,
    dueDate: dueDate,
    status: "To Do" // Default status
  };

  // Add the new task to the tasks array
  tasks.push(newTask);

  // Create the task card
  createTaskCard(taskId, taskName, taskDescription, dueDate);}
// Get the modal
var modal = document.getElementById("taskModal");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Handle form submission
document.getElementById("taskForm").onsubmit = function(event) {
  event.preventDefault(); // Prevent the default form submission
  // Logic to add the task goes here
  console.log("Task Name:", document.getElementById("taskName").value);
  console.log("Description:", document.getElementById("taskDescription").value);
  modal.style.display = "none"; // Close the modal after submission
};
