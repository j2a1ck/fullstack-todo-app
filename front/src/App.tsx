import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/home";
import Auth from "./assets/pages/login";

export interface TodoItem {
  _id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const apiUrl = import.meta.env.VITE_URL + "/tasks";

  if (!import.meta.env.VITE_URL) {
    throw new Error("Your VITE_URL from env is missing please add to .env");
  }
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = async (todoData: { title: string }) => {
    try {
      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: todoData.title,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newTask = await response.json();
      setTodos((prev) => [...prev, newTask]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (itemId: string) => {
    try {
      if (!itemId) {
        console.error("Invalid ID");
        return;
      }

      const response = await fetch(`${apiUrl}/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedTask = await response.json();
      setTodos(todos.map((todo) => (todo._id === itemId ? updatedTask : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (itemId: string) => {
    try {
      if (!itemId) {
        console.error("Invalid ID");
        return;
      }

      const response = await fetch(`${apiUrl}/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== itemId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetch(`${apiUrl}`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              todos={todos}
              addTodo={addTodo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          }
        />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
