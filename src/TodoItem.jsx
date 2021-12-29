import cn from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

import CheckCircleOutline from "./icons/CheckCircleOutline";

import "./TodoItem.scss";


const propTypes = {
  text: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  toggleDone: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};


const TodoItem = ({ text, done, toggleDone, index }) => {
  return (
    <Draggable draggableId={`todo-item-${index}`} index={index}>
      {(provided) => (
        <li className="list-group-item todo-item" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <span className={cn("checkbox", { done })} onClick={toggleDone}>
            <CheckCircleOutline />
          </span>
          <span className="text">{text}</span>
        </li>
      )}
    </Draggable>
  )
}


TodoItem.displayName = "TodoItem";
TodoItem.propTypes = propTypes;


export default TodoItem;
