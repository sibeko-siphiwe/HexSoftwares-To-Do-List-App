let textbox = document.getElementById('Todo');
const btnAdd = document.getElementById('add');
const todoList = document.getElementById('todo-list');

loadTodoList();

btnAdd.onclick = () => {
    const txtTask = textbox.value.trim();
    if (txtTask !== '') {
        createTodoItem(txtTask);
    } else {
        alert('Could not add an empty task. Please try again');
    }
    textbox.value = "";
    saveTodoList();
}

function createTodoItem(value) {
    let todoItem = document.createElement('li');
    todoItem.innerHTML = `
      <input type="checkbox">
      <span>${value}</span>
      <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(todoItem);
}

todoList.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox') {
        e.target.parentNode.classList.toggle("checked");
    } else if (e.target.classList.contains('delete-btn')) {
        e.target.parentNode.remove();
    }
});

function loadTodoList() {
    let storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
        let todoListData = JSON.parse(storedTodoList);
        todoListData.forEach((item) => {
            let todoItem = document.createElement('li');
            todoItem.innerHTML = `
              <input type="checkbox" ${item.checked ? 'checked' : ''}>
              <span>${item.value}</span>
              <button class="delete-btn">Delete</button>
            `;
            if (item.checked) {
                todoItem.classList.add('checked');
            }
            todoList.appendChild(todoItem);
        });
    }
}

function saveTodoList() {
    let todoItems = todoList.children;
    let todoListData = [];
    for (let i = 0; i < todoItems.length; i++) {
        let todoItem = todoItems[i];
        let checkbox = todoItem.querySelector('input[type="checkbox"]');
        let value = todoItem.querySelector('span').textContent;
        todoListData.push({
            value: value,
            checked: checkbox.checked
        });
    }
    localStorage.setItem('todoList', JSON.stringify(todoListData));
}