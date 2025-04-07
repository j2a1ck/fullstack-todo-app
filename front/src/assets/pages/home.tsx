import React from "react";
import TodoForm from "../Components/TodoForm";
import Todo from "../Components/Todo";
import { TodoItem } from "../../App";
import { useEffect } from "react";

interface HomeProps {
  todos: TodoItem[];
  addTodo: (todoData: { title: string }) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  getTodos: () => void;
}

const Home: React.FC<HomeProps> = ({
  todos,
  addTodo,
  toggleTodo,
  deleteTodo,
  getTodos,
}) => {
  const token = localStorage.getItem("authToken");
  console.log("Fetching todos with token:", !!token);

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    } else {
      getTodos();
    }
  }, []);

  return (
    <div>
      <div className="flex-container">
        <TodoForm addTodo={addTodo} />
        {todos.map((todoItem, index) => (
          <Todo
            key={index}
            task={todoItem}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            getTodos={getTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
