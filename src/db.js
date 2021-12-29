import Dexie from "dexie";


const db = new Dexie("todo");
db.version(1).stores({
  todos: '++id, text, done',
});


export async function loadTodos() {
  return db.todos.toArray();
}


export async function createTodo(text, done) {
  const id = await db.todos.add({ text, done });
  return { text, done, id };
}


export async function updateTodo(todo, force=false) {
  if (todo.editable && !force) {
    return;
  }
  return db.todos.put(todo, todo.id);
}


export async function deleteTodo(todo) {
  await db.todos.delete(todo.id);
}


export async function clearAllTodos() {
  return db.todos.clear();
}
