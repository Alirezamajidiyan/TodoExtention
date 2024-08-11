document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("add-task-btn")
    .addEventListener("click", addTaskHandler);
  document
    .getElementById("new-task-input")
    .addEventListener("input", clearError);
  document
    .getElementById("new-task-input")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        addTaskHandler();
      }
    });
  loadTasks();
});

function errorHandling(errorText) {
  const errorElem = document.getElementById("error");
  errorElem.innerHTML = errorText;
  errorElem.style.display = "block";
  document.getElementById("new-task-input").classList.add("error");
}

function clearError() {
  const errorElem = document.getElementById("error");
  errorElem.innerHTML = "";
  errorElem.style.display = "none";
  document.getElementById("new-task-input").classList.remove("error");
}

function addTaskHandler() {
  const taskValue = document.getElementById("new-task-input").value;
  if (taskValue.trim() !== "") {
    clearError();
    addTask(taskValue);
    document.getElementById("new-task-input").value = "";
    saveTasks();
  } else {
    errorHandling("تسک خالی معتبر نمیباشد");
  }
}

function addTask(taskValue, isCompleted = false) {
  const parentList = document.getElementById("task-list");
  const item = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;
  checkbox.addEventListener("change", toggleTask);

  let text = document.createElement("span");
  text.textContent = taskValue;

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.addEventListener("click", function () {
    editTask(item, text, editBtn);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteBtn.addEventListener("click", function () {
    deleteTask(item);
  });

  item.appendChild(checkbox);
  item.appendChild(text);
  item.appendChild(editBtn);
  item.appendChild(deleteBtn);

  if (isCompleted) {
    item.classList.add("completed");
  }

  parentList.appendChild(item);
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#task-list li").forEach(function (task) {
    const text = task.querySelector("span").textContent;
    const isCompleted = task.querySelector("input").checked;
    tasks.push({ text, isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function (task) {
    addTask(task.text, task.isCompleted);
  });
}

function toggleTask(e) {
  const li = e.target.parentNode;
  li.classList.toggle("completed", e.target.checked);
  saveTasks();
}

function deleteTask(item) {
  item.classList.add("fade-out");
  new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
    item.remove();
    saveTasks();
  });
}

function editTask(item, textSpan, editBtn) {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = textSpan.textContent;
  editInput.className = "edit-input";

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn";
  saveBtn.innerHTML = '<i class="fas fa-save"></i>';
  saveBtn.addEventListener("click", function () {
    textSpan.textContent = editInput.value;
    item.replaceChild(textSpan, editInput);
    item.replaceChild(editBtn, saveBtn);
    saveTasks();
  });

  item.replaceChild(editInput, textSpan);
  item.replaceChild(saveBtn, editBtn);
  editInput.focus();
}

document.addEventListener('contextmenu',(e)=>{
  e.preventDefault();
  alert('شما نمیتوانید از کلیک راست استفاده کنید')
})
