import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const apiUrl = import.meta.env.VITE_URL;

  if (!import.meta.env.VITE_URL) {
    throw new Error("Your VITE_URL from env is missing please add to .env");
  }

  const register = async () => {
    try {
      const responseRegister = await fetch(apiUrl + "/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const registerData = await responseRegister.json();

      if (responseRegister.ok) {
        console.log("Registration successful:", registerData);
        setUsername("");
        setPassword("");
        setRegisterSuccess(true);
        alert("Registration successful! You can now log in.");
      } else {
        console.error(
          "Registration failed:",
          registerData.message || registerData
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const login = async () => {
    try {
      const responseLogin = await fetch(apiUrl + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const loginData = await responseLogin.json();

      if (responseLogin.ok) {
        console.log("Login successful:", loginData);
        if (loginData.token) {
          localStorage.setItem("authToken", loginData.token);
          setLoginSuccess(true);
          setUsername("");
          setPassword("");
          setTimeout(() => navigate("/"), 1000);
        }
      } else {
        console.error("Login failed:", loginData.message || loginData);
        alert("Login failed: " + (loginData.message || "Invalid credentials"));
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      console.log("User already has auth token");
    }
  }, []);

  return (
    <div className="login-container">
      <form className="card">
        <div className="form-group">
          {registerSuccess && <span>you are signup successful</span>}
          {loginSuccess && <span>you are login successful</span>}

          <label htmlFor="username">username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            className="login-input"
            type="text"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="login-input"
            type="password"
            placeholder="Enter your password"
          ></input>
          <div className="form-buttons">
            <button
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
              type="submit"
              className="login-btn btn-primary"
            >
              Login
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                register();
              }}
              type="button"
              className="signup-btn btn-secondary"
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Auth;
