import cn from "classnames";
import PropTypes from "prop-types";
import React from "react";

import CheckCircleOutline from "./icons/CheckCircleOutline";

import "./TodoItem.scss";


const propTypes = {
  text: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  toggleDone: PropTypes.func.isRequired,
};


const TodoItem = ({ text, done, toggleDone }) => {
  return (
    <li className="list-group-item todo-item">
      <span className={cn("checkbox", { done })} onClick={toggleDone}>
        <CheckCircleOutline />
      </span>
      <span className="text">{text}</span>
    </li>
  )
}


TodoItem.displayName = "TodoItem";
TodoItem.propTypes = propTypes;


export default TodoItem;
