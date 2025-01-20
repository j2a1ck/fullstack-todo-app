import React from "react";
import TodoForm from "../Components/TodoForm";
import Todo from "../Components/Todo";
import { TodoItem } from "../../App";

interface HomeProps {
  todos: TodoItem[];
  addTodo: (todoData: { title: string }) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({
  todos,
  addTodo,
  toggleTodo,
  deleteTodo,
}) => (
  <div className="flex-container">
    <TodoForm addTodo={addTodo} />
    {todos.map((todoItem, index) => (
      <Todo
        key={index}
        task={todoItem}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    ))}
  </div>
);

export default Home;
