import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

interface TodoFormProps {
  addTodo: (todoData: { title: string }) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [taskText, setTaskText] = useState<string>("");

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskText.trim()) {
      addTodo({ title: taskText });
    }
    setTaskText("");
  }

  return (
    <div className="container">
      <form className="" onSubmit={handleFormSubmit}>
        <h1 className="oswald title">Your To Do</h1>
        <div>
          <div className="row-button">
            <div>
              <input
                id="todo-input"
                value={taskText}
                onChange={(event) => setTaskText(event.target.value)}
                placeholder="Add new task"
              ></input>
              <div className="line"></div>
            </div>
            <button type="submit">
              <FaPlus className="plus-icon" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
