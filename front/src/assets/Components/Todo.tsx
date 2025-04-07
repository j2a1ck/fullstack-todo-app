import React from "react";

import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
interface TodoProps {
  task: TodoItem;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  getTodos: () => void;
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
        {task.completed ? <IoCheckbox /> : <MdCheckBoxOutlineBlank />}
      </div>
      <label className={task.completed ? "completed" : ""}>{task.title}</label>
      <div className="trashIcon" onClick={() => deleteTodo(task._id)}>
        <span>✖</span>
      </div>
    </div>
  );
};

export default Todo;
