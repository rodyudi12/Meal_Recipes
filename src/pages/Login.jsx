import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

const LoginPage = () => {
  const { login, csrfToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // Basic validation
    if (!cleanEmail.includes("@")) {
      return setError("Invalid email address");
    }

    if (cleanPassword.length < 3) {
      return setError("Password too short");
    }

    try {
      login(cleanEmail, cleanPassword, csrfToken);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      <p>
        For demo, you can use:
        <br />
        user@user.com / user123
        <br />
        admin@admin.com / admin123
      </p>

      {/* React escapes this automatically */}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginPage;