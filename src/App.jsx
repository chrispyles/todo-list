import React from "react";

import TodoList from "./TodoList";

// import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";


export default function App() {
  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TodoList />
    </div>
  )
}
