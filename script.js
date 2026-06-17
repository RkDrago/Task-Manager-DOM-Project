const form = document.querySelector("#taskForm")
const taskContainer = document.querySelector("#taskContainer")

const totalCount = document.getElementById("totalCount")
const completedCount = document.getElementById("completedCount")
const pendingCount = document.getElementById("pendingCount")

const editModal = document.getElementById("editModal")
const editTaskInput = document.getElementById("editTaskInput")
const editCategory = document.getElementById("editCategory")
const saveEdit = document.getElementById("saveEdit")
const closeModal = document.getElementById("closeModal")
let currentTaskId = null

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

renderTasks()

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function updateCounts() {
  totalCount.textContent = tasks.length;
  const completed = tasks.filter(task => task.status === "completed").length;

  completedCount.textContent = completed;
  pendingCount.textContent = tasks.length - completed;
}

function renderTasks() {
  taskContainer.innerHTML = ""
  const fragment = document.createDocumentFragment()
  tasks.forEach(task => {
    const card = document.createElement("div")
    card.className = "task"
    card.dataset.id = task.id
    card.dataset.status = task.status
    card.dataset.category = task.category

    if (task.status === "completed") {
      card.classList.add("completed")
    }

    const title = document.createElement("h3")
    const textNode = document.createTextNode(task.title)
    title.append(textNode)

    const category = document.createElement("p")
    category.innerHTML = `<div style="padding-top:10px" ><i>Category</i>: <strong>${task.category}</strong></div>`

    const actions = document.createElement("div")
    actions.className = "actions"
    actions.innerHTML = `
      <button class="edit">Edit</button>
      <button class="complete">Complete</button>
      <button class="delete">Delete</button>
    `
    card.append(title)
    card.append(category)
    card.append(actions)

    fragment.append(card)
  });

  taskContainer.append(fragment)
  updateCounts();
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const title = document.querySelector("#taskTitle").value
  const category = document.querySelector("#category").value
  const task = {
    id: Date.now(),
    title,
    category,
    status: "pending"
  };

  tasks.push(task)

  saveTasks()
  renderTasks()
  form.reset()
});


// Here event delegation is performed

taskContainer.addEventListener("click", e => {
  const taskCard = e.target.closest(".task")
  if (!taskCard) return
  const id = Number(taskCard.dataset.id)
  const task = tasks.find(t => t.id === id);

  console.log(e.target);

  if (e.target.classList.contains("delete")) {
    taskCard.remove()
    tasks = tasks.filter(t => t.id !== id);

    saveTasks()
    renderTasks()
  }

  if (e.target.classList.contains("complete")) {
    task.status = task.status === "completed" ? "pending" : "completed"

    saveTasks()
    renderTasks()
  }

  if (e.target.classList.contains("edit")) {
    currentTaskId = id

    editTaskInput.value = task.title
    editCategory.value = task.category
    editModal.classList.remove("hidden")
  }
});

// Edit task Modal handling

saveEdit.addEventListener("click", () => {
  const task = tasks.find(task => task.id === currentTaskId)

  if (!task) return
  task.title = editTaskInput.value.trim()
  task.category = editCategory.value

  saveTasks()
  renderTasks()
  editModal.classList.add("hidden")
});


closeModal.addEventListener("click", (e) => {
  editModal.classList.add("hidden");
});



const clearAll = document.getElementById("clearAll")
clearAll.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks();
});


// EVENT BUBBLING === Child -> Parent -> Grandparent

const grandparent = document.getElementById("grandparent")
const parent = document.getElementById("parent")
const child = document.getElementById("child")

grandparent.addEventListener("click", () => {
  console.log("Grandparent Bubble");
});

parent.addEventListener("click", () => {
  console.log("Parent Bubble");
});

child.addEventListener("click", () => {
  console.log("Child Bubble");
});


// EVENT CAPTURING === Grandparent -> Parent -> Child 

grandparent.addEventListener("click", () => {
  console.log("Grandparent Capture");
}, true);

parent.addEventListener("click", () => {
  console.log("Parent Capture");
}, true);

child.addEventListener("click", () => {
  console.log("Child Capture");
}, true);

// theme Toggle

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle")

themeToggle.addEventListener("click", () => {

  const current = html.dataset.theme;

  const next = current === "light" ? "dark" : "light";

  html.dataset.theme = next;

  html.setAttribute(
    "data-theme",
    next
  );
});

// for attribute and properties

const showDifference = document.getElementById("showDifference")
showDifference.addEventListener("click", () => {
  const input = document.getElementById("demoInput");
  
    // PROPERTY    (current live value)
  const propertyValue = input.value;

    // ATTRIBUTE    (original html value)
  const attributeValue =
    input.getAttribute("value");

  const differenceOutput = document.getElementById("differenceOutput")
  differenceOutput.innerHTML = `<span title='input.getAttribute("value")'><strong> Attribute </strong></span>: ${attributeValue} || <span title="input.value"><strong>Property </strong></span>: ${propertyValue}`;
});