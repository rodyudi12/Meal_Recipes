import "./Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} SmartMeal. All rights reserved.</p>
      <p>
        <a href="https://www.themealdb.com/api.php" target="_blank" rel="noreferrer">
          Recipe API Source
        </a>
      </p>
    </footer>
  );
};

export default Footer;