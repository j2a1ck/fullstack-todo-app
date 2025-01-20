import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";

interface TodoProps {
  task: TodoItem;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

interface TodoItem {
  _id: string;
  title: string;
  completed: boolean;
}

const Todo: React.FC<TodoProps> = ({ task, toggleTodo, deleteTodo }) => {
  return (
    <div className="list">
      <div className="checkbox" onClick={() => toggleTodo(task._id)}>
        <FontAwesomeIcon
          icon={task.completed ? faSquareCheck : faCircleCheck}
          className={task.completed ? "checked-icon" : "unchecked-icon"}
        />
      </div>
      <label className={task.completed ? "completed" : ""}>{task.title}</label>
      <div className="trashIcon" onClick={() => deleteTodo(task._id)}>
        <span>✖</span>
      </div>
    </div>
  );
};

export default Todo;
