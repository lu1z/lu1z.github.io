import { Link } from 'react-router-dom';
import '../css/header.css';

function Header() {
  return (
    <header className="page-header">
      <nav className="main-navigation">
        <ul className="navigation-menu">
          <li><Link to="/" className="menu-item">Home</Link></li>
          <li><Link to="/history" className="menu-item">History</Link></li>
          <li><a href="https://www.betrybe.com/formacao-desenvolvimento-web" target="_blank" rel="noopener noreferrer" className="menu-item">Curso Trybe</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
