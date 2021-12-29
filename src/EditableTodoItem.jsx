import cn from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button } from "react-bootstrap";

import CheckCircleOutline from "./icons/CheckCircleOutline";

import "./TodoItem.scss";


const propTypes = {
  text: PropTypes.string,
  done: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};


const defaultProps = {
  text: "",
  done: false,
}


export default class EditableTodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.setText = this.setText.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = {
      text: props.text,
    }
  }

  setText(e) {
    this.setState({ text: e.target.value });
  }

  onSave() {
    this.props.onSave(this.state.text);
  }

  render() {
    return (
      <Draggable draggableId={`todo-item-${this.props.index}`} index={this.props.index}>
        {(provided) => (
          <li className="list-group-item todo-item d-flex" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <div>
              <span className={cn("checkbox", { done: this.props.done }, "disabled")}>
                <CheckCircleOutline />
              </span>
            </div>
            <div className="todo-text-input">
              <input type="text" value={this.state.text} onChange={this.setText} />
            </div>
            <div>
              <Button variant="success" onClick={this.onSave}>Save</Button>
            </div>
            <div>
              <Button variant="danger" onClick={this.props.onDelete}>Delete</Button>
            </div>
          </li>
        )}
      </Draggable>
    );
  }
}


EditableTodoItem.displayName = "EditableTodoItem";
EditableTodoItem.propTypes = propTypes;
EditableTodoItem.defaultProps = defaultProps;
