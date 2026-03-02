import { Link } from "react-router-dom";
import logoImage from "../assets/Logo.png";
import "./Header.css";

const Header = ({ links }) => {
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
      </nav>

    </header>
  );
};

export default Header;