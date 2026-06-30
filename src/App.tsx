import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre-mi" element={<AboutPage />} />
            <Route path="/proyectos" element={<ProjectsPage />} />
            <Route path="/contacto" element={<ContactPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;