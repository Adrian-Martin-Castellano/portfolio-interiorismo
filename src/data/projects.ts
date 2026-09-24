export interface Project {
  id: string;
  title: {
    es: string;
    en: string;
  };
  category: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  images: string[];
  featured: boolean;
  date: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "residencia-villa-olivo",
    title: {
      es: "Residencia Villa Olivo",
      en: "Villa Olivo Residence"
    },
    category: {
      es: "Interiorismo / Residencial",
      en: "Interior Design / Residential"
    },
    description: {
      es: "Diseño integral con énfasis en luz natural y materiales nobles.",
      en: "Comprehensive design highlighting natural light and local materials."
    },
    images: [
      "/assets/projects/villa-olivo-1.jpg", 
      "/assets/projects/villa-olivo-2.jpg", 
      "/assets/projects/villa-olivo-3.jpg"  
    ],
    featured: true,
    date: "2026-08-01"
  },
  {
    id: "estudio-orotava",
    title: {
      es: "Estudio Creativo La Orotava",
      en: "Creative Studio La Orotava"
    },
    category: {
      es: "Comercial / Oficinas",
      en: "Commercial / Offices"
    },
    description: {
      es: "Rehabilitación de espacio histórico transformado en entorno de trabajo.",
      en: "Restoration of a historic space converted into a workspace."
    },
    images: [
      "/assets/projects/orotava-1.jpg" 
    ],
    featured: true,
    date: "2026-06-15"
  },
  {
    id: "atico-horizon",
    title: {
      es: "Ático Horizon Line",
      en: "Horizon Line Penthouse"
    },
    category: {
      es: "Residencial",
      en: "Residential"
    },
    description: {
      es: "Optimización de espacios diáfanos con vistas panorámicas.",
      en: "Optimization of open-plan spaces featuring panoramic views."
    },
    images: [
      "/assets/projects/horizon-1.jpg",
      "/assets/projects/horizon-2.jpg"
    ],
    featured: true,
    date: "2026-04-10"
  }
];