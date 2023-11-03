let todos = [] ;
//selecting :
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");

todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener(("change"),filterTodos);

function addNewTodo(e){
    e.preventDefault();
    if(!todoInput.value) return null ;

    const newTodo = {
        id : Date.now(),
        createdAt : new Date().toISOString(),
        title : todoInput.value,
        isCompleted : false,
    };
    todos.push(newTodo);
    createTodos(todos);
}
function createTodos(todos){
    // create todos on DOM :
let result = "";
todos.forEach((todo)=>{
    result += `
    <li class="todo flex bg-slate-50 rounded-md p-1 mb-1 justify-between items-center w-80 h-8">
        <p class="todo__title grow ${todo.isCompleted && "completed"}">${todo.title}</p>
        <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</span>
        <button class="todo__check" data-todo-id=${todo.id}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" fill-green-500 w-6 h-6 mx-1.5">
                <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>     
        </button>
        <button class="todo__remove" data-todo-id=${todo.id}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>                 
        </button>
    </li>
  `
});

  todoList.innerHTML = result ;
  todoInput.value = "";

const removeBtns = [...document.querySelectorAll(".todo__remove")];
removeBtns.forEach((btn)=> btn.addEventListener("click",removeTodo));

const checkBtns = [...document.querySelectorAll(".todo__check")];
checkBtns.forEach((btn)=> btn.addEventListener("click",checkTodo));
}



function removeTodo(e){
    // console.log(e.currentTarget.dataset.todoId);
    const todoId = Number(e.currentTarget.dataset.todoId) ; 
    todos = todos.filter((t)=> t.id !== todoId);
    // console.log(todos);
    createTodos(todos);
}

function checkTodo(e){
    const todoId = Number(e.currentTarget.dataset.todoId) ; 
    const todo = todos.find((t)=> t.id == todoId);
    todo.isCompleted = !todo.isCompleted;
    createTodos(todos);
}

function filterTodos (e){
    const filter = e.target.value;
    switch (filter){
        case "all" :{
            createTodos(todos);
            break;
        }
        case "completed" : {
            const filteredTodos = todos.filter((t)=> t.isCompleted);
            createTodos(filteredTodos);
            break;
        }
        case "uncompleted" : {
            const filteredTodos = todos.filter((t)=> !t.isCompleted);
            createTodos(filteredTodos);
            break;
        }
        default :
            createTodos(todos);
    }
}
createTodos(todos); 


