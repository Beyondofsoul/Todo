//Добавление задачи
//Выполнение задачи
const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks = []

if(localStorage.getItem('tasks')){
tasks = JSON.parse(localStorage.getItem('tasks'))
tasks.forEach((task) => renderTask(task));
}



checkEmptyList()

function handleAdd(e){
// Отмена отправки формы
e.preventDefault()
//достаем текст из поля ввода
const taskText = taskInput.value

const newTask = {
    id: Date.now(),
    text:  taskText,
    done: false,
}

tasks.push(newTask)

saveToLocalStorage()

renderTask(newTask)

                //очистка списка
                taskInput.value = ''
                //фокус на инпуте
                taskInput.focus()
                //убирание списка дел

                checkEmptyList()
}

function handleDelete(e) {
if(e.target.dataset.action !== 'delete') {
    return
}

const parentNode = e.target.closest('.list-group-item')

const id = Number(parentNode.id)
const index = tasks.findIndex( (task) => task.id === id)

tasks.splice(index, 1)

saveToLocalStorage()

parentNode.remove()

checkEmptyList()
} 

function handleDone(e) {

    if(e.target.dataset.action !== 'done') return
    
    

    const parentNode = e.target.closest('.list-group-item') 

    const id = Number(parentNode.id)
    const task = tasks.find( (task) => task.id === id)
    task.done = !task.done

    saveToLocalStorage()

    const taskTitle = parentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')
    }
 

function checkEmptyList() {
    if (tasks.length === 0){
        const emptyListHTML = `
        <li id="emptyList" class="list-group-item empty-list">
			<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
			<div class="empty-list__title">Список дел пуст</div>
		</li>`
        tasksList.insertAdjacentHTML("afterbegin", emptyListHTML)
    }
    if(tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'

//разметка
const taskHtml = `
				<li id='${task.id}' class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>
                `
                //добавление в html
                tasksList.insertAdjacentHTML('beforeend', taskHtml)
}

//удаление задачи
tasksList.addEventListener('click', handleDelete)
//Выполнение задачи
tasksList.addEventListener('click', handleDone)
//Добавление задачи
form.addEventListener('submit', handleAdd)
