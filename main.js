const inputVal = document.getElementsByClassName("inputVal")[0];

const addTaskBtn = document.getElementsByClassName("btn")[0];
const editTask = document.getElementsByClassName("editBtn");
addTaskBtn.addEventListener("click", function () {
  if (inputVal.value.trim() != 0) {
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    if (localItems === null) {
      taskList = [];
    } else {
      taskList = localItems;
    }
    taskList.push({ value: inputVal.value, done: false });
    localStorage.setItem("localItem", JSON.stringify(taskList));
  }
  let modal = document.querySelector(".modalBlock");
  let myTodo = document.querySelector(".myTodo");
  modal.style.display = "none";
  myTodo.style.opacity = 1;
  showItem();
});

function showItem() {
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  if (localItems === null) {
    taskList = [];
  } else {
    taskList = localItems;
  }

  let html = "";
  let itemShow = document.querySelector(".todoLists");
  taskList.forEach((data, index) => {
    if (data.done) {
      html += `
      <div class="todoList">
      <input class="input line-through" type="text" value="${data.value}" readonly onClick="done(${index})"/>
      <button class="deleteTask" onClick="deleteItem(${index})"><i class="fa-solid fa-x"></i></button>
      <button class="editBtn" onClick="editItem(${index})"><i class="fa-solid fa-pen"></i></button>
      <button class="saveEdit" hidden onClick="saveEdit(${index})"><i class="fa-solid fa-check"></i></button>
      </div>
      `;
    } else {
      html += `
    <div class="todoList">
    <input class="input " type="text" value="${data.value}" readonly onClick="done(${index})"/>
    <button class="deleteTask" onClick="deleteItem(${index})"><i class="fa-solid fa-x"></i></button>
    <button class="editBtn" onClick="editItem(${index})"><i class="fa-solid fa-pen"></i></button>
    <button class="saveEdit" hidden onClick="saveEdit(${index})"><i class="fa-solid fa-check"></i></button>
    </div>
    `;
    }
  });
  itemShow.innerHTML = html;
}
showItem();

function deleteItem(index) {
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  taskList.splice(index, 1);
  localStorage.setItem("localItem", JSON.stringify(taskList));
  showItem();
}

function editItem(index) {
  let redactInput = document.querySelectorAll(".input");
  hideTwoBtn(index);
  console.log(redactInput[index]);
  redactInput[index].removeAttribute("onclick");
  redactInput[index].readOnly = false;
}
function saveEdit(index) {
  let newValue = {
    value: document.querySelectorAll(".input")[index].value,
    done: false,
  };
  console.log(newValue);
  taskList.splice(index, 1, newValue);
  localStorage.setItem("localItem", JSON.stringify(taskList));

  showItem();
}
function clearTask() {
  localStorage.clear();
  showItem();
}
function hideTwoBtn(i) {
  let confirmEdit = document.querySelectorAll(".saveEdit");
  let deletBtn = document.querySelectorAll(".deleteTask");
  let edit = document.querySelectorAll(".editBtn");
  edit[i].hidden = true;
  deletBtn[i].hidden = true;
  confirmEdit[i].hidden = false;
}
function done(i) {
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  let input = document.querySelectorAll(".input")[i];
  let newDone = {
    value: input.value,
    done: !localItems[i].done,
  };
  taskList.splice(i, 1, newDone);
  localStorage.setItem("localItem", JSON.stringify(taskList));
  input.classList.toggle("line-through");
  console.log(localItems[i].done);
}
function openModal() {
  let modal = document.querySelector(".modalBlock");
  let myTodo = document.querySelector(".myTodo");
  modal.style.display = "flex";
  myTodo.style.opacity = 0.2;
}
