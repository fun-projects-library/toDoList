var input = document.querySelector("#input_task");
var completedList = document.getElementById("completed_list");
var completedTitle = document.getElementById("completed_title");
var taskList = document.getElementById("task_list");
completedTitle.style.display = "none";

// Check if input is empty
document.getElementById("add_button").addEventListener("click", checkInput);
function checkInput() {
	if (input.value != "") {
		newTask();
	}
}

// Add a new task
function newTask() {
	var list = document.getElementById("task_list");
	var li = document.createElement("li"); 
	var checkbox = document.createElement("input");
		checkbox.setAttribute("type", "checkbox");
		checkbox.checked = false;
	var span = document.createElement("span");
		span.setAttribute("class", "input");
	var edit = document.createElement("button");
		edit.setAttribute("type", "button");
		edit.setAttribute("class", "edit_task_button");
	var del = document.createElement("button");
		del.setAttribute("type", "button");
		del.setAttribute("class", "delete");
	
	list.prepend(li);
	li.appendChild(checkbox);
	li.appendChild(span);
	li.appendChild(edit);
	li.appendChild(del);

	span.innerHTML = input.value ;
	edit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
	del.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
	input.value = "";

	checkbox.addEventListener("click", completeTask);
	edit.addEventListener("click", editTask);
	del.addEventListener("click", deleteTask);
};

// Edit a task
document.querySelectorAll("button[class='edit_task_button'").forEach(editBtn => editBtn.addEventListener("click", editTask));
function editTask() {
	this.parentNode.children[0].checked = false;
	this.parentNode.children[0].disabled = true;;
	this.previousElementSibling.setAttribute('class', 'span_editable');
	this.previousElementSibling.setAttribute('contenteditable', '');
	this.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
	this.style.backgroundColor = "mediumseagreen";
	this.removeEventListener("click", editTask);
	this.addEventListener("click", validateEditTask);
}

// Validate changes
function validateEditTask() {
	this.parentNode.children[0].disabled = false;;
	this.previousElementSibling.removeAttribute('class', 'span_editable');
	this.previousElementSibling.removeAttribute('contenteditable', '');
	this.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
	this.style.backgroundColor = "grey";
	this.removeEventListener("click", validateEditTask);
	this.addEventListener("click", editTask);
}

// Mark a task as complete
document.querySelectorAll("input[type=checkbox]").forEach(box => box.addEventListener("click", completeTask));
function completeTask() {
	this.checked = true;
	this.nextElementSibling.classList.toggle("complete");
	this.nextElementSibling.nextElementSibling.style.visibility = "hidden";
	this.removeEventListener("click", completeTask);
	this.addEventListener("click", uncompleteTask);
	completedList.prepend(this.parentNode);
	isEmptyList();
};

// Uncheck a task
function uncompleteTask() {
	this.checked = false;
	this.nextElementSibling.classList.toggle("complete");
	this.nextElementSibling.nextElementSibling.style.visibility = "visible";
	this.removeEventListener("click", uncompleteTask);
	this.addEventListener("click", completeTask);
	taskList.prepend(this.parentNode);
	isEmptyList();
}

// Delete a task
document.querySelectorAll(".delete").forEach(delBtn => delBtn.addEventListener("click", deleteTask));
function deleteTask() {
	this.parentNode.parentNode.removeChild(this.parentNode);
	isEmptyList();
};

// Edit title list
document.querySelector(".edit_title_button").addEventListener("click", editTitleList);
function editTitleList() {
	this.previousElementSibling.setAttribute('class', 'title_editable input_title');
	this.previousElementSibling.setAttribute('contenteditable', '');
	this.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
	this.style.backgroundColor = "mediumseagreen";
	this.removeEventListener("click", editTitleList);
	this.addEventListener("click", validateEditTitleList);
}

// Validate title changes
function validateEditTitleList(){
	this.parentNode.children[0].disabled = false;;
	this.previousElementSibling.removeAttribute('class', 'title_editable');
	this.previousElementSibling.setAttribute('class', 'input_title');
	this.previousElementSibling.removeAttribute('contenteditable', '');
	this.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
	this.style.backgroundColor = "grey";
	this.removeEventListener("click", validateEditTitleList);
	this.addEventListener("click", editTitleList);
}

// Check if the complete list is empty
function isEmptyList() {
	if (completedList.hasChildNodes() == true) {
		completedTitle.style.display = "inline";
	} else {
		completedTitle.style.display = "none";
	}
}