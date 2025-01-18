import React, { useState } from "react";

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
    <div>
      <form className="box" onSubmit={handleFormSubmit}>
        <input
          id="IDK"
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
          placeholder="what is next? "
        ></input>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default TodoForm;
