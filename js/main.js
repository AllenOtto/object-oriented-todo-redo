// Grab all elements I need
const form = document.querySelector("[data-form]");
const input = document.querySelector("[data-input]");
const lists = document.querySelector("[data-lists]");

// Empty array to store todos
let todoArr = [];

// Add event listener to form
form.addEventListener('submit', (e) => {
	// Prevent page refresh on submit
	e.preventDefault();
	// Create todo item/object
	let id = Math.random() * 1000000;
	const todo = new Todo(id, input.value);
	todoArr = [...todoArr, todo];
	UI.displayData();
	UI.clearInput();
	UI.removeTodo();

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

	static clearInput() {
		input.value = "";
	}

	static removeTodo() {
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
		todoArr = todoArr.filter((todo) => todo.id !== +id);
	}
}


