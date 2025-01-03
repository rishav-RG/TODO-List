document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task))
        updateTaskLists()
        updateStats()
    }
})

let tasks = [];

const storeTasks = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
const addTask = () => {
    const taskInput = document.querySelector('#taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; 
        updateTaskLists();
        updateStats();
        storeTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskLists();
    updateStats();
    storeTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskLists();
    updateStats();
    storeTasks();
};
 
const updateTaskName = (index) => {  
    const taskInput = document.querySelector('#taskInput');   
    const newTaskText = taskInput.value.trim();  
    if (newTaskText) {  
        tasks[index].text = newTaskText;  
        taskInput.value = "";   
    }  
    updateTaskLists();   
    updateStats(); 
    storeTasks();  
};  

const editTask = (index) => {  
    const taskInput = document.querySelector('#taskInput');  
    taskInput.value = tasks[index].text;  

    alert("Please enter updated task in input field & press Enter.");  

    taskInput.focus();  

    taskInput.onkeydown = (event) => {  
        if (event.key === 'Enter') {  
            updateTaskName(index);  
            taskInput.onkeydown = null; 
        }  
    };  
    storeTasks();
};  


const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const TotalTasks = tasks.length;

    const progress = TotalTasks === 0 ? 0 : (completedTasks / TotalTasks) * 100;
    const progressBar = document.querySelector('#progress');
    progressBar.style.width = `${progress}%`;

    document.querySelector('#numbers').innerText = `${completedTasks} / ${TotalTasks}`;
};

const updateTaskLists = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                <p>${task.text}</p>   
            </div>
            <div class="icons">
                <img src="/edit.png" onClick="editTask(${index})" />
                <img src="/bin.png" onClick="deleteTask(${index})" />
            </div>
        </div>
        `;
        const checkbox = listItem.querySelector(".checkbox");
        checkbox.addEventListener('change', () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};


document.querySelector('#getTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
