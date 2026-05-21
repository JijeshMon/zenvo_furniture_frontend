import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/images/logo/logo.png';    

function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-icon">
          <img src={logo} alt="Zenvo Logo" />
        
        </div>
        <div className="logo-text">
          <span className="logo-main">
            Zen<span className="logo-highlight">Uo</span>
          </span>
          <span className="logo-sub">Furniture</span>
        </div>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>
            Products
          </Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About Us
          </Link>
        </li>
      </ul>

      <div className="nav-icons">
        <i className="fas fa-search"></i>
        <i className="fas fa-shopping-cart"></i>
        <i className="fas fa-user"></i>
      </div>
    </nav>
  );
}

export default Navbar;