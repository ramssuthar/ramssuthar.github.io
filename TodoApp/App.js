// Selectors------------------------------------------------
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
// Event Listeners------------------------------------------
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click",filterTodo)
// Functions------------------------------------------------
function addTodo(event) {
//prevent form from submiting
event.preventDefault();

//creating div tag
const todoDiv = document.createElement('div');
todoDiv.classList.add('todo');
todoList.appendChild(todoDiv);

//creating list-item inside div tag
const newTodo = document.createElement('li');
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);
newTodo.innerText = todoInput.value;

//Check Button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="ion ion-android-done"></i>' ;
completedButton.classList.add('completed-button');
todoDiv.appendChild(completedButton);

//Delete Button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="ion ion-android-close"></i>' ;
trashButton.classList.add('trash-button');
todoDiv.appendChild(trashButton);

//Clear Todo Input Vlaue
todoInput.value = "";
}

//Deleting Items and checkItem
function deleteCheck(event) {
const item = event.target;
  if(item.classList[0] === "trash-button"){
    const deleteItem = item.parentElement;
    deleteItem.classList.toggle('fall');
    deleteItem.addEventListener("transitionend", function() {
      deleteItem.remove();
    });
  }
  if(item.classList[0] ==="completed-button"){
    const checkItem = item.parentElement;
    checkItem.classList.toggle('completed');
  }
}

//  Filtering items

function filterTodo(event) {
  const todoItems = todoList.childNodes;
  todoItems.forEach((todo) => {
    switch (event.target.value) {
      case "all":
      todo.style.display = "flex";
        break;

        case "completed":if (todo.classList.contains('completed')) {
          todo.style.display = "flex";
        }else {
          todo.style.display = "none";
        }
          break;
          case "uncompleted":if (!todo.classList.contains('completed')) {
            todo.style.display = "flex";
          }else {
            todo.style.display = "none";
          }

            break;
    }
  });

}
