const inputElement = document.getElementById('input');
const btnElement = document.getElementById('addBtn');
const listElement = document.getElementById('todoList');

function getTodo() {
    let todoArr = new Array;
    let todoStorage = localStorage.getItem('todoList')
    if (todoStorage !== null) {
        todoArr = JSON.parse(todoStorage)
    }
    return todoArr
}

function add() {
    let todoArr = getTodo()
    if(inputElement.value != "" && inputElement.value != " ") { 
        todoArr.push(inputElement.value.trim())
    }else {
        alert("Please Insert some value")
    }
    localStorage.setItem('todoList', JSON.stringify(todoArr))
    show()
    inputElement.value = ""
    return false
}

function remove() {
    let id = this.getAttribute('id');
    let todoArr = getTodo()
    todoArr.splice(id, 1);
    localStorage.setItem('todoList', JSON.stringify(todoArr));
    show();
    return false
}
function clearAll() {
    localStorage.clear()
    show()
}

function clearDefault(a) {
    if(a.defaultValue == a.value){a.value=""}
}

function show() {
    let todoArr = getTodo()
    let html = "<ul>";
    for(let i=0; i < todoArr.length; i++) {
        html+= "<li>" + todoArr[i] + "<button class='remove' id='"+i+"'>Remove</button></li>"
    }
    html+= "<button class='clearAll' onclick='clearAll()'>Clear All</button></ul>"

    listElement.innerHTML = html

    let removeBtn = document.getElementsByClassName('remove')
    for(let i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener('click', remove)
    }
}

btnElement.addEventListener('click', add)
show()