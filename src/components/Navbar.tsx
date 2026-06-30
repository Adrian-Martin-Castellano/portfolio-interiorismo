import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

import logoImg from '../assets/logo.png'; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? '#c5a880' : '#8e867a',
    fontWeight: isActive ? '500' : '400',
  });

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img src={logoImg} alt="Logo BLIC" className={styles.logoImage} />
        </Link>
      </div>
      
      <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        <NavLink to="/" style={linkStyle} onClick={() => setIsOpen(false)}>
          Inicio
        </NavLink>
        
        <NavLink to="/sobre-mi" style={linkStyle} onClick={() => setIsOpen(false)}>
          Sobre Mí
        </NavLink>
        
        <NavLink to="/proyectos" style={linkStyle} onClick={() => setIsOpen(false)}>
          Proyectos
        </NavLink>
        
        <NavLink to="/contacto" style={linkStyle} onClick={() => setIsOpen(false)}>
          Contacto
        </NavLink>
      </div>

      <button className={styles.menuIcon} onClick={toggleMenu} aria-label="Toggle menu">
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
}

export default Navbar;