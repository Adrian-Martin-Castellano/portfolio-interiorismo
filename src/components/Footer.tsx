import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.copyright}>
          © {currentYear} <span>Belisario Jesús Izquierdo Cruz</span>
        </p>

        <div className={styles.location}>
          <FaMapMarkerAlt className={styles.pinIcon} />
          <span>Islas Canarias, España</span>
        </div>
        
        <div className={styles.socials}>
          <a href="https://wa.me/34600000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp className={styles.icon} />
          </a>
          <a href="https://instagram.com/tu-usuario" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className={styles.icon} />
          </a>
          <a href="https://x.com/tu-usuario" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <FaXTwitter className={styles.icon} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;