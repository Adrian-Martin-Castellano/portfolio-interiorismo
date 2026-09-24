import type { Project } from '../data/projects';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  language: 'es' | 'en';
}

export function ProjectCard({ project, language }: ProjectCardProps) {
  const coverImage = project.images[0] || '/assets/projects/placeholder.jpg';

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={coverImage} 
          alt={project.title[language]} 
          loading="lazy" 
        />
        {project.images.length > 1 && (
          <span className={styles.galleryBadge}>
            +{project.images.length - 1}
          </span>
        )}
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{project.category[language]}</span>
        <h3 className={styles.title}>{project.title[language]}</h3>
        <p className={styles.description}>{project.description[language]}</p>
      </div>
    </article>
  );
}