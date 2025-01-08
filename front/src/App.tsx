import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./assets/Components/Navbar";
import Home from "./assets/pages/home";
import About from "./assets/pages/about";

interface TodoItem {
  _id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = async (newTodo: TodoItem) => {
    try {
      const response = await fetch(
        "https://todo-app-o2sf.onrender.com/api/v1/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTodo.title,
            completed: false,
          }),
        }
      );

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

      const response = await fetch(
        `https://todo-app-o2sf.onrender.com/api/v1/${itemId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

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

      const response = await fetch(
        `https://todo-app-o2sf.onrender.com/api/v1/${itemId}`,
        {
          method: "DELETE",
        }
      );

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
    fetch("https://todo-app-o2sf.onrender.com/api/v1/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
      });
  }, []);

  return (
    <Router>
      <Navbar />
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
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
