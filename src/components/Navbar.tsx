import { useState } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import styles from './Navbar.module.css';

import logoImg from '../assets/logo.png'; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? '#c5a880' : 'var(--text-color-secondary)',
    fontWeight: isActive ? '500' : '400',
  });

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img src={logoImg} alt="Logo BLIC" className={styles.logoImage} />
        </Link>
      </div>
      
      {/* Enlaces del menú */}
      <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        <NavLink to="/" style={linkStyle} onClick={() => setIsOpen(false)}>
          {language === 'es' ? 'Inicio' : 'Home'}
        </NavLink>
        
        <NavLink to="/sobre-mi" style={linkStyle} onClick={() => setIsOpen(false)}>
          {language === 'es' ? 'Sobre Mí' : 'About Me'}
        </NavLink>
        
        <NavLink to="/proyectos" style={linkStyle} onClick={() => setIsOpen(false)}>
          {language === 'es' ? 'Proyectos' : 'Projects'}
        </NavLink>
        
        <NavLink to="/contacto" style={linkStyle} onClick={() => setIsOpen(false)}>
          {language === 'es' ? 'Contacto' : 'Contact'}
        </NavLink>
      </div>

      {/* ACCIONES (Idioma + Tema + Hamburguesa) SIEMPRE ARRIBA */}
      <div className={styles.navActions}>
        {/* Botón Cambiar Idioma */}
        <button onClick={toggleLanguage} className={styles.langToggleBtn} aria-label="Cambiar idioma">
          <span className={styles.langText}>{language.toUpperCase()}</span>
          <span className={styles.langDot}></span>
        </button>

        {/* Botón Cambiar Tema (Sol / Luna) */}
        <button onClick={toggleTheme} className={styles.themeToggleBtn} aria-label="Cambiar tema">
          {theme === 'light' ? <FaMoon className={styles.themeIcon} /> : <FaSun className={styles.themeIcon} />}
        </button>

        {/* Botón Menú Hamburguesa en Móvil */}
        <button className={styles.menuIcon} onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;