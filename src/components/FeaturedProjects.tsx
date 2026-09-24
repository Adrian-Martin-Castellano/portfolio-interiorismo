import { PROJECTS_DATA } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import styles from './FeaturedProjects.module.css';

interface FeaturedProjectsProps {
  language: 'es' | 'en';
}

export function FeaturedProjects({ language }: FeaturedProjectsProps) {
  const featuredProjects = PROJECTS_DATA
    .filter((project) => project.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.tag}>
          {language === 'en' ? 'Selected Works' : 'Trabajos Seleccionados'}
        </span>
        <h2 className={styles.title}>
          {language === 'en' ? 'Featured Projects' : 'Proyectos Destacados'}
        </h2>
      </div>

      <div className={styles.grid}>
        {featuredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            language={language} 
          />
        ))}
      </div>
    </section>
  );
}