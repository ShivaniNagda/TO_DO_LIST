let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const addTaskBtn = document.getElementById("add-btn");
const tasksCounter = document.getElementById('tasks-counter');

// Add Task To DOM

function addTaskToDOM(task){
    const li = document.createElement('li');
    li.innerHTML = `
      
          <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <img src="bin.png" class="delete" data-id="${task.id}" />
        
    `
    tasksList.append(li);
}

function renderList () {
    tasksList.innerHTML = '';
    tasks.forEach(addTaskToDOM);
    // for(let i =0; i < tasks.length; i++){
    //     addTaskToDOM(tasks[i]);
    // }
    tasksCounter.innerHTML = tasks.length;

}
// Toggle task : task Complete or not 
function toggleTask(taskId) {
    const task = tasks.filter(function(task){
        return task.id === taskId;
    })
    if(task.length>0){
        const currentTAsk = task[0];
        currentTAsk.done = !currentTAsk.done;
        renderList();
        showNotification('Task Toggled Successfully');
        return;
    }
    showNotification('Could Not Toggled The Task!')
}
// Task (Todo) delete
function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId;
    })
    tasks = newTasks;
    renderList();
    showNotification('Task Deleted Successfully');
}
// Add new Task
function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task Added Successfully');
        return;
    }
    showNotification('Task Can not be added')
}
// Notification alert
function showNotification(text) {
    alert(text);
}
// take Input and enter or click on add task
function handleInputKeypress(e) {
    if(e.key === 'Enter' ||  e.type === 'click'){
        const text = e.target.value || addTaskInput.value;
        console.log(text);
        if(!text){
            showNotification('Task Can not be Empty');
            return;
        }
        const task ={
            text,
            id:Date.now().toString(),
            done:false
        }
        addTaskInput.value = '';
        e.target.value='';
        addTask(task)
    }
}
// for delete and custom check box onclick handler
function handleClickListener(e){
    const {target} = e;
    console.log(target);
    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}
function initializeTODOLIST(){
addTaskInput.addEventListener('keyup',handleInputKeypress) ;
addTaskBtn.addEventListener('click',handleInputKeypress);
document.addEventListener('click',handleClickListener);
}
initializeTODOLIST();