import { Link } from "react-router-dom";
import logoImage from "../assets/Logo.png";
import "./Header.css";
import { useAuth } from "../contexts/AuthContext";

const Header = ({ links }) => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="FastRecipes Logo" />
        </Link>
      </div>

      <nav className="nav-links">
        {links.map((link) => (
          <Link key={link.name} to={link.path}>
            {link.name}
          </Link>
        ))}

        {user ? (
          <>
            {user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;