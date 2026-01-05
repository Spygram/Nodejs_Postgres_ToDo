const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

async function loadTodos() {
  const res = await fetch("/todos");
  const todos = await res.json();
  list.innerHTML = "";
  todos.forEach(addTodoToUI);
}

function addTodoToUI(todo) {
  const li = document.createElement("li");
  li.textContent = todo.title;

  if (todo.completed) li.classList.add("completed");

  li.onclick = async () => {
    await fetch(`/todos/${todo.id}`, { method: "PUT" });
    loadTodos();
  };

  li.oncontextmenu = async (e) => {
    e.preventDefault();
    await fetch(`/todos/${todo.id}`, { method: "DELETE" });
    loadTodos();
  };

  list.appendChild(li);
}

form.onsubmit = async (e) => {
  e.preventDefault();
  if (!input.value.trim()) return;

  await fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value.trim() }),
  });

  input.value = "";
  loadTodos();
};

loadTodos();
