var date = new Date(),
    topBar = document.getElementById('topBar'),
    infoBar = document.getElementById('infoContainer'),
    taskButtonContainer = document.getElementById('buttonContainer'),
    calButton = document.getElementById('pickDate'),
    calSocket = document.getElementById('calSocket'),
    cover = document.getElementById('cover'),
    addButton = document.getElementById('addButton'),
    removeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="21.6" height="25" viewBox="0 0 21.6 25"><g fill="#FFF"><path d="M5.4 11.3h1.5v9.4H5.4zM8.5 11.3H10v9.4H8.5zM11.7 11.3h1.5v9.4h-1.5zM14.8 11.3h1.5v9.4h-1.5z"/><path d="M19.3 3.4h-4.4c-.4-2-2.1-3.4-4.1-3.4C8.7 0 7 1.5 6.7 3.4H2.2C1 3.4 0 4.4 0 5.7v.5c0 1.2 1 2.2 2.2 2.2h.4v14.4c0 1.2 1 2.2 2.2 2.2h11.9c1.2 0 2.2-1 2.2-2.2V8.4h.4c1.2 0 2.2-1 2.2-2.2v-.5c.1-1.3-.9-2.3-2.2-2.3zm-8.5-1.9c1.2 0 2.3.8 2.6 2H8.2c.3-1.2 1.3-2 2.6-2zm6.7 21.3c0 .4-.3.7-.7.7h-12c-.4 0-.7-.3-.7-.7V8.5h13.4v14.3zm2.6-16.6c0 .4-.3.7-.7.7H2.2c-.4 0-.7-.3-.7-.7v-.5c0-.4.3-.7.7-.7h17.1c.4 0 .7.3.7.7v.5z"/></g></svg>',
    checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27"><path fill="#FFF" d="M13.5 27C6.1 27 0 20.9 0 13.5S6.1 0 13.5 0 27 6.1 27 13.5 20.9 27 13.5 27zm0-25C7.2 2 2 7.2 2 13.5S7.2 25 13.5 25 25 19.8 25 13.5 19.8 2 13.5 2z"/><path fill="#FFF" d="M11.3 18.5c-.2 0-.3-.1-.5-.2L6.5 14c-.3-.3-.3-.7 0-.9.3-.3.7-.3.9 0l4.3 4.3c.3.3.3.7 0 .9-.1.1-.2.2-.4.2z"/><path fill="#FFF" d="M11.3 18.5c-.2 0-.3-.1-.5-.2-.3-.3-.3-.7 0-.9l8.7-8.7c.3-.3.7-.3.9 0 .3.3.3.7 0 .9l-8.7 8.7c-.1.1-.2.2-.4.2z"/></svg>',
    storedList = {
        completed: {
            desc: [],
            period: [],
            removeIcon: [],
            checkIcon: []
        },
        uncompleted: {
            desc: [],
            period: [],
            removeIcon: [],
            checkIcon: []
        }
    };

topBar.innerHTML = date.getDate() + " " + calendar.monthLabel[date.getMonth()] + " " + date.getFullYear();

calButton.addEventListener('click', function () {
    'use strict';
    taskButtonContainer.style.transition = 'all .6s';
    taskButtonContainer.style.top = '-53%';
    taskButtonContainer.style.left = '50%';
    taskButtonContainer.style.transform = 'translate(-50%, -50%)';
    taskButtonContainer.style.width = "210px";
    taskButtonContainer.style.height = '420px';
    calButton.style.backgroundColor = 'white';
    calButton.style.transition = 'all .7s';
    calButton.style.boxShadow = 'none';
    calButton.style.height = '500px';
    calButton.style.width = '500px';
    calSocket.style.display = 'block';
    cover.style.display = 'block';
});

cover.addEventListener('click', function () {
    'use strict';
    infoBar.style.display = 'none';
    taskButtonContainer.style.transition = 'all .7s';
    taskButtonContainer.style.top = '-20%';
    taskButtonContainer.style.left = '50%';
    taskButtonContainer.style.transform = 'translate(-50%, -50%)';
    taskButtonContainer.style.width = "60px";
    taskButtonContainer.style.height = '60px';
    calButton.style.backgroundColor = 'orange';
    calButton.style.transition = 'all .6s';
    calButton.style.boxShadow = '0px 2px 5px #333';
    calButton.style.height = '50px';
    calButton.style.width = '50px';
    calSocket.style.display = 'none';
    cover.style.display = 'none';
});

/**********************************************
* CHECK TASK Will remove a task tag from
* the list
**********************************************/
var checkTask = function () {
    'use strict';
    
    // Get tag's location
    var tag = this.parentNode.parentNode,
        parent = tag.parentNode,
        parentId = parent.id,
        status,
        value = tag.childNodes[1].innerHTML, // Use the tag's desc as reference
        i, // Get the index
        period = tag.childNodes[2].innerHTML,
        remove = tag.childNodes[0].childNodes[0].innerHTML,
        check = tag.childNodes[0].childNodes[1].innerHTML;
        
    // If the task unckecked
    if (parentId === 'todo') {
        status = document.getElementById('done');
        
        // Get the index
        i = storedList.uncompleted.desc.indexOf(value);
        
        // Add into completed list
        storedList.completed.desc.push(value);
        storedList.completed.period.push(period);
        storedList.completed.removeIcon.push(remove);
        storedList.completed.checkIcon.push(check);
        
        // Delete from uncompleted list
        storedList.uncompleted.checkIcon.splice(i, 1);
        storedList.uncompleted.removeIcon.splice(i, 1);
        storedList.uncompleted.desc.splice(i, 1);
        storedList.uncompleted.period.splice(i, 1);

        // Update the local storage
        localStorage.setItem('todoList', JSON.stringify(storedList));
        

    } else {
        // You can also uncheck a task...
        status = document.getElementById('todo');
        
        // Get the index
        i = storedList.completed.desc.indexOf(value);
        
        // Add into uncompleted list
        storedList.uncompleted.desc.push(value);
        storedList.uncompleted.period.push(period);
        storedList.uncompleted.removeIcon.push(remove);
        storedList.uncompleted.checkIcon.push(check);
        
        // Delete from completed list
        storedList.completed.checkIcon.splice(i, 1);
        storedList.completed.removeIcon.splice(i, 1);
        storedList.completed.desc.splice(i, 1);
        storedList.completed.period.splice(i, 1);
        
        // Update the local storage
        localStorage.setItem('todoList', JSON.stringify(storedList));
        
    }
    
    parent.removeChild(tag);
    status.insertBefore(tag, status.childNodes[0]);
};

/******************************************************************************
* REMOVE TASK Will remove a task tag from the list, from the stored data and 
* update the local storage
******************************************************************************/
var removeTask = function () {
    'use strict';
    
    // Get tag's location
    var tag = this.parentNode.parentNode,
        parent = tag.parentNode,
        parentId = parent.id,
        value = tag.childNodes[1].innerHTML, // Use the tag's desc as reference
        i; // Get the index
    
    // If the task unckecked
    if (parentId === 'todo') {
        
        // Get the index
        i = storedList.uncompleted.desc.indexOf(value);
        
        // Delete from uncompleted list
        storedList.uncompleted.checkIcon.splice(i, 1);
        storedList.uncompleted.removeIcon.splice(i, 1);
        storedList.uncompleted.desc.splice(i, 1);
        storedList.uncompleted.period.splice(i, 1);

        // Update the local storage
        localStorage.setItem('todoList', JSON.stringify(storedList));
        

    } else {
        
        // Get the index
        i = storedList.completed.desc.indexOf(value);
        
        // Delete from completed list
        storedList.completed.checkIcon.splice(i, 1);
        storedList.completed.removeIcon.splice(i, 1);
        storedList.completed.desc.splice(i, 1);
        storedList.completed.period.splice(i, 1);
        
        // Update the local storage
        localStorage.setItem('todoList', JSON.stringify(storedList));
        
    }
    
    // Remove tag from its parent (from its list)
    parent.removeChild(tag);
    
    // Update the local storage
    localStorage.setItem('todoList', JSON.stringify(storedList));
    
};

/**********************************************
* ADD TASK Will add a new task tag to the list
**********************************************/
function addTask(task, period) {
    'use strict';
    
    // Create Elements from the task tag
    var tag = document.createElement('li'),
        listButtons = document.createElement('div'),
        remove = document.createElement('button'),
        done = document.createElement('button'),
        taskHolder = document.createElement('div'),
        periodHolder = document.createElement('div'),
        todo = document.getElementById('todo');
    
    // Assign class to the elements
    listButtons.className = 'listButtons';
    remove.className = 'remove';
    done.className = 'done';
    taskHolder.className = 'desc';
    periodHolder.className = 'period';
    
    // Set the task values
    taskHolder.innerHTML = task;
    // Shrink the string if it is too big
    if (task.length > 17) {
        taskHolder.innerHTML = task;
        taskHolder.style.fontSize = '12px';
    }
    periodHolder.innerHTML = period; // add the date
    remove.innerHTML = removeIcon; // Add the svg icon
    done.innerHTML = checkIcon;    // Add the svg icon
    
    // Add function to remove a task
    remove.addEventListener('click', removeTask);
    
    // Add function to check/uncheck a task
    done.addEventListener('click', checkTask);
    
    // Beget buttons as children
    listButtons.appendChild(remove);
    listButtons.appendChild(done);
    tag.appendChild(listButtons);
    tag.appendChild(taskHolder);
    tag.appendChild(periodHolder);
    
    // Append children to the a tag in the list
    todo.insertBefore(tag, todo.childNodes[0]);
    
    // Store the task in localStorage
    storedList.uncompleted.desc.push(taskHolder.innerHTML);
    storedList.uncompleted.period.push(periodHolder.innerHTML);
    storedList.uncompleted.removeIcon.push(remove.innerHTML);
    storedList.uncompleted.checkIcon.push(done.innerHTML);
    
    // Register the task in local storage for future use
    localStorage.setItem('todoList', JSON.stringify(storedList));
    
}

/*****************************************************
* ADD BUTTON CLICK EVENT Will add a task to the list
*****************************************************/
addButton.addEventListener('click', function () {
    'use strict';
    
    // Varables are self explanatory
    var task = document.getElementById('taskInput').value,
        period = calendar.getPick() + "/" + (calendar.getMonth() + 1) + '/' + calendar.getYear();
    
    // If gets a value inside the input box
    if (task) {
        addTask(task, period);
        
        // reset the value
        document.getElementById('taskInput').value = '';
    }
});

/******************************************************************************
* LOAD DATA Will read the local storage and display load back the list's
* previous state
******************************************************************************/
function loadData() {
    'use strict';
    var x = 0,
        uncompleted = JSON.parse(localStorage.getItem('todoList')
                                ).uncompleted.desc,
        completed = JSON.parse(localStorage.getItem('todoList')
                              ).completed.desc;
    
    // Use a FOR IN loop to load the uncompleted data back. 
    // It seems more adequate here
    for (x in uncompleted) {
        // Create Elements from the task tag
        var tag = document.createElement('li'),
            listButtons = document.createElement('div'),
            remove = document.createElement('button'),
            done = document.createElement('button'),
            taskHolder = document.createElement('div'),
            periodHolder = document.createElement('div'),
            todo = document.getElementById('todo');

        // Assign class to the elements
        listButtons.className = 'listButtons';
        remove.className = 'remove';
        done.className = 'done';
        taskHolder.className = 'desc';
        periodHolder.className = 'period';

        // reload the task description name
        taskHolder.innerHTML = JSON.parse(localStorage.getItem('todoList')).uncompleted.desc[x];
        // Shrink the string if it is too big
        if (JSON.parse(localStorage.getItem('todoList')).uncompleted.desc[0].length > 17) {
            taskHolder.innerHTML = JSON.parse(localStorage.getItem('todoList')).uncompleted.desc[x];
            taskHolder.style.fontSize = '12px';
        }

        periodHolder.innerHTML = JSON.parse(localStorage.getItem('todoList')).uncompleted.period[x]; // reload the date
        remove.innerHTML = JSON.parse(localStorage.getItem('todoList')).uncompleted.removeIcon[x];   // reload the svg icon
        done.innerHTML = JSON.parse(localStorage.getItem('todoList')).uncompleted.checkIcon[x];      // reload the svg icon

        // Add function to remove a task
        remove.addEventListener('click', removeTask);

        // Add function to check/uncheck a task
        done.addEventListener('click', checkTask);

        // Beget buttons as children
        listButtons.appendChild(remove);
        listButtons.appendChild(done);
        tag.appendChild(listButtons);
        tag.appendChild(taskHolder);
        tag.appendChild(periodHolder);

        // Append children to the a tag in the list
        todo.insertBefore(tag, todo.childNodes[0]);
    }
    
    // Reset the iterator
    x = 0;
    
    // Use a FOR IN loop to load the completed data back. 
    // It seems more adequate here    
    for (x in completed) {
        // Create Elements from the task tag
        var tag = document.createElement('li'),
            listButtons = document.createElement('div'),
            remove = document.createElement('button'),
            done = document.createElement('button'),
            taskHolder = document.createElement('div'),
            periodHolder = document.createElement('div'),
            checked = document.getElementById('done');

        // Assign class to the elements
        listButtons.className = 'listButtons';
        remove.className = 'remove';
        done.className = 'done';
        taskHolder.className = 'desc';
        periodHolder.className = 'period';

        // reload the task description name
        taskHolder.innerHTML = JSON.parse(localStorage.getItem('todoList')).completed.desc[x];
        // Shrink the string if it is too big
        if (JSON.parse(localStorage.getItem('todoList')).completed.desc[0].length > 17) {
            taskHolder.innerHTML = JSON.parse(localStorage.getItem('todoList')).completed.desc[x];
            taskHolder.style.fontSize = '12px';
        }

        periodHolder.innerHTML = JSON.parse(localStorage.getItem('todoList')).completed.period[x]; // reload the date
        remove.innerHTML = JSON.parse(localStorage.getItem('todoList')).completed.removeIcon[x];   // reload the svg icon
        done.innerHTML = JSON.parse(localStorage.getItem('todoList')).completed.checkIcon[x];      // reload the svg icon

        // Add function to remove a task
        remove.addEventListener('click', removeTask);

        // Add function to check/uncheck a task
        done.addEventListener('click', checkTask);

        // Beget buttons as children
        listButtons.appendChild(remove);
        listButtons.appendChild(done);
        tag.appendChild(listButtons);
        tag.appendChild(taskHolder);
        tag.appendChild(periodHolder);

        // Append children to the a tag in the list
        checked.insertBefore(tag, checked.childNodes[0]);
    }
    
    // Reload the stored list
    storedList = JSON.parse(localStorage.getItem('todoList'));
}