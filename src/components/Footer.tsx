import { FaInstagram, FaPhone, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.copyright}>
          © {currentYear} <span>Belisario Jesús Izquierdo Cruz</span>
        </p>

        <div className={styles.socials}>
          <a 
            href="tel:+34722519395" 
            aria-label="Teléfono"
          >
            <FaPhone className={styles.icon} />
          </a>
          <a 
            href="" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
          >
            <FaInstagram className={styles.icon} />
          </a>
          <a 
            href="mailto:blicinteriorismo@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Gmail"
          >
            <FaEnvelope className={styles.icon} />
          </a>
          <a 
            href="https://www.linkedin.com/in/jesus-izq-316a2a445?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
          >
            <FaLinkedin className={styles.icon} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;