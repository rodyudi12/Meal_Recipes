import { createContext, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const csrfToken = useMemo(() => crypto.randomUUID(), []);

  const demoUsers = [
    { email: "user@user.com", password: "user123", role: "user", name: "Demo User" },
    { email: "admin@admin.com", password: "admin123", role: "admin", name: "Admin User" },
  ];

  const login = (email, password, submittedCsrfToken) => {
    if (submittedCsrfToken !== csrfToken) {
      throw new Error("Security validation failed.");
    }

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    const foundUser = demoUsers.find(
      (u) => u.email === cleanEmail && u.password === cleanPassword
    );

    if (!foundUser) {
      throw new Error("Invalid email or password.");
    }

    // 🔐 Never store password
    setUser({
      email: foundUser.email,
      role: foundUser.role,
      name: foundUser.name,
    });

    navigate("/");
  };

  const register = (name, email, password, submittedCsrfToken) => {
    if (submittedCsrfToken !== csrfToken) {
      throw new Error("Security validation failed.");
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanName || !cleanEmail || !cleanPassword) {
      throw new Error("All fields are required.");
    }

    setUser({
      name: cleanName,
      email: cleanEmail,
      role: "user",
    });

    navigate("/");
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, csrfToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);