// Grab all elements I need
const form = document.querySelector("[data-form]");
const input = document.querySelector("[data-input]");
const lists = document.querySelector("[data-lists]");

// Local Storage Class Implementation
class Storage {
	static addToLocalStorage(todoArr) {
		let storage = localStorage.setItem("todoRedo", JSON.stringify(todoArr));
		return storage;
	}

	static getFromLocalStorage() {
		let storage = localStorage.getItem("todoRedo") === null ? [] : JSON.parse(localStorage.getItem("todoRedo"));
		return storage;
	}
}

// Empty array to store todos
let todoArr = Storage.getFromLocalStorage();

// Add event listener to form
form.addEventListener('submit', (e) => {
	// Prevent page refresh on submit
	e.preventDefault();
	// Create todo item/object
	let id = Math.random() * 1000000;
	const todo = new Todo(id, input.value);
	todoArr = [...todoArr, todo];
	// Display todo item on UI
	UI.displayData();
	// Remove user input from input field on UI
	UI.clearInput();
	// Delete todo item
	UI.removeTodoFromUI();
	// Add todo item to local storage for persistence
	Storage.addToLocalStorage(todoArr);
});

// Create a class for todo entry
class Todo {
	constructor(id, todo) {
		this.id = id;
		this.todo = todo;
	}
}

// Display the todo in the DOM
class UI {
	static displayData() {
		let displayData = todoArr.map((item) => {
			return `
				<div class="todo">
					<p>${item.todo}</p>
					<span class="remove" data-id=${item.id}>🗑️</span>
				</div>`
		});

		lists.innerHTML = (displayData).join("");
	}

	// Remove user input from input field once submitted
	static clearInput() {
		input.value = "";
	}

	static removeTodoFromUI() {
		lists.addEventListener('click', (e) => {
			if(e.target.classList.contains("remove")) {
				e.target.parentElement.remove();
			}

			// Get id of todo targetted for removal
			let btnId = e.target.dataset.id;
			UI.removeTodoFromArray(btnId);
		});
	}

	static removeTodoFromArray(id) {
		// Filter out of todoArray and remove todo item 
		// targetted by remove request (click on trash icon)
		todoArr = todoArr.filter((todo) => todo.id !== +id);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	// Display todo item on UI
	UI.displayData();
});
