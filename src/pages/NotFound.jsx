import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      <Link to="/">
        <button>Go Home</button>
      </Link>
    </div>
  );
};

export default NotFound;