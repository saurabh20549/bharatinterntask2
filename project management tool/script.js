document.addEventListener('DOMContentLoaded', function () {
    const userList = document.getElementById('user-list');
    const taskList = document.getElementById('task-list');
    const messageBox = document.getElementById('message-box');
    const messageInput = document.getElementById('message-input');
    const sendMessageButton = document.getElementById('send-message');
    const changeUserInput = document.getElementById('change-user-input');
    const changeUserButton = document.getElementById('change-user');
    const assignedTasksContainer = document.getElementById('assigned-tasks');

    let currentUser = '';

    // adding the sample data
    const users = ['User 1', 'User 2', 'User 3'];
    const tasks = [
        { name: 'Study', assignedTo: 'User 1', assignedBy: 'Kshitiz' },
        { name: 'Read', assignedTo: 'User 2', assignedBy: 'Saurabh' },
        { name: 'Play', assignedTo: 'User 3', assignedBy: 'Karan' }
    ];

    // Function to update assigned tasks display
    function updateAssignedTasks() {
        assignedTasksContainer.innerHTML = '<h3>Assigned Tasks</h3>';
        assignedTasksContainer.style.color = "white";
        tasks.forEach(task => {
            if (task.assignedTo === currentUser) {
                const taskElement = document.createElement('div');
                taskElement.textContent = `Task: ${task.name} (Assigned by: ${task.assignedBy})`;
                taskElement.style.color = "white";
                assignedTasksContainer.appendChild(taskElement);
            }
        });
    }

    // Function to display messages
    function sendMessage(sender, receiver, message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${sender} (to ${receiver}): ${message}`;
        messageBox.appendChild(messageElement);
        messageBox.scrollTop = messageBox.scrollHeight;
    }

    // user list
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        userList.appendChild(li);
    });

    // task list
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.textContent = `${task.name}`;

        const assignButton = document.createElement('button');
        assignButton.classList.add('assign-button');
        assignButton.textContent = 'Assign Task';

        assignButton.addEventListener('click', () => {
            const assignedUser = prompt('Enter username to assign task:');
            if (users.includes(assignedUser)) {
                alert(`Task assigned to ${assignedUser}`);
                tasks.push({ name: task.name, assignedTo: assignedUser, assignedBy: currentUser });
                updateAssignedTasks();
            } else {
                alert('Invalid user!');
            }
        });

        li.appendChild(assignButton);
        taskList.appendChild(li);
    });

    // changing user
    changeUserButton.addEventListener('click', () => {
        const newUsername = changeUserInput.value.trim();
        if (users.includes(newUsername)) {
            currentUser = newUsername;
            updateAssignedTasks();
        } else {
            alert('Invalid user!');
        }
        changeUserInput.value = '';
    });

    // messaging
    sendMessageButton.addEventListener('click', () => {
        const selectedUser = prompt('Enter recipient username:');
        const message = messageInput.value.trim();
        if (message !== '' && users.includes(selectedUser)) {
            sendMessage(currentUser, selectedUser, message);
            messageInput.value = '';
        } else {
            alert('Invalid recipient or empty message!');
        }
    });



    const fromUserSelect = document.getElementById('from-user');
    const toUserSelect = document.getElementById('to-user');
    const messageForm = document.getElementById('message-form');

    // user options in the form
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user;
        option.textContent = user;
        fromUserSelect.appendChild(option.cloneNode(true));
        toUserSelect.appendChild(option);
    });

    // form submission
    messageForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const fromUser = fromUserSelect.value;
        const toUser = toUserSelect.value;
        const message = document.getElementById('message-text').value.trim();

        if (message !== '') {
            sendMessage(fromUser, toUser, message);
            document.getElementById('message-text').value = '';
        } else {
            alert('Please enter a message!');
        }
    });

    const taskSelect = document.getElementById('task');
    const assigneeSelect = document.getElementById('assignee');
    const assignerSelect = document.getElementById('assigner');
    const assignTaskForm = document.getElementById('assign-task-form');

    //  task options in the form
    tasks.forEach(task => {
        const option = document.createElement('option');
        option.value = task.name;
        option.textContent = task.name;
        taskSelect.appendChild(option);
    });

    // user options in the form
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user;
        option.textContent = user;
        assigneeSelect.appendChild(option.cloneNode(true));
        assignerSelect.appendChild(option.cloneNode(true));
    });

    // form submission
    assignTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskName = taskSelect.value;
        const assignee = assigneeSelect.value;
        const assigner = assignerSelect.value;

        tasks.push({ name: taskName, assignedTo: assignee, assignedBy: assigner });
        updateAssignedTasks();
        assignTaskForm.reset();
    });


});