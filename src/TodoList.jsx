import React from "react";
import { Button } from "react-bootstrap";

import { clearAllTodos, createTodo, deleteTodo, loadTodos, updateTodo } from "./db";
import EditableTodoItem from "./EditableTodoItem";
import TodoItem from "./TodoItem";

import "./TodoList.scss";


export default class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.loadTodos = this.loadTodos.bind(this);
    this.seedDatabase = this.seedDatabase.bind(this);
    this.clearDatabase = this.clearDatabase.bind(this);
    this.toggleTodoDone = this.toggleTodoDone.bind(this);
    this.addNewRow = this.addNewRow.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);

    this.state = {
      todos: null,
    };
  }

  loadTodos() {
    loadTodos().then(todos => this.setState({ todos }));
  }

  seedDatabase() {
    const promises = [];
    for (let i = 1; i < 6; i++) {
      promises.push(createTodo(`TODO ${i}`, false));
    }
    Promise.all(promises).then(() => this.loadTodos());
  }

  clearDatabase() {
    clearAllTodos().then(() => this.loadTodos());
  }

  toggleTodoDone(idx) {
    const todos = [...this.state.todos];
    todos[idx].done = !todos[idx].done;
    updateTodo(todos[idx]).then(() => console.log(`successfully updated TODO ${todos[idx].id}`));
    this.setState({ todos });
  }

  addNewRow() {
    const todos = [...this.state.todos];
    todos.push({ editable: true });
    this.setState({ todos });
  }

  saveTodo(idx, text) {
    const todos = [...this.state.todos];
    const done = todos[idx].done || false;
    createTodo(text, done).then((t) => {
      console.log(`successfully created TODO ${t.id}`);
      todos[idx] = t;
      this.setState({ todos });
    });
  }

  deleteTodo(idx) {
    const todos = [...this.state.todos];
    const todo = todos[idx];
    if (todo.id) {
      deleteTodo(todo).then(() => {
        console.log(`successfully deleted TODO ${todo.id}`);
        todos.splice(idx, 1);
        this.setState({ todos });
      })
    }
    else {
      todos.splice(idx, 1);
      this.setState({ todos });
    }
  }

  componentDidMount() {
    this.loadTodos();
  }

  render() {
    if (!this.state.todos) {
      return <h2>Loading</h2>
    }
    return (
      <div>
        <ul className="list-group">
          {this.state.todos.map((t, i) => {
            let TodoItemComponent = TodoItem;
            if (t.editable) {
              TodoItemComponent = EditableTodoItem;
            }
            return (
              <TodoItemComponent 
                key={`todo-item-${i}`} 
                text={t.text} 
                done={t.done} 
                toggleDone={() => this.toggleTodoDone(i)} 
                onSave={(text) => this.saveTodo(i, text)}
                onDelete={() => this.deleteTodo(i)}
              />
            );
          })}
        </ul>
        <div className="button-group d-flex justify-content-center mt-3">
          <Button variant="success" className="mx-1" onClick={this.addNewRow}>Create</Button>
          <Button variant="primary" className="mx-1" onClick={this.seedDatabase}>Seed</Button>
          <Button variant="danger" className="mx-1" onClick={this.clearDatabase}>Clear</Button>
        </div>
      </div>
    )
  }
}
