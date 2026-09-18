export interface QuizOption {
  id: string;
  label: { es: string; en: string };
  sublabel?: { es: string; en: string };
  image?: string;
  hex?: string;
  styles: Record<string, number>;
}

export interface Question {
  id: number;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  type: 'single' | 'multiple';
  maxSelections?: number;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: {
      es: "¿Qué atmósfera o sensación buscas al entrar a tu hogar?",
      en: "What atmosphere or feeling do you seek when entering your home?"
    },
    subtitle: {
      es: "Selecciona el ambiente con el que más te identificas (1 opción)",
      en: "Select the atmosphere you identify with most (1 choice)"
    },
    type: "single",
    options: [
      {
        id: "p1_opt1",
        label: { es: "Luminosa & Calma", en: "Luminous & Calm" },
        sublabel: { es: "Elegancia neutra y serenidad", en: "Neutral elegance and serenity" },
        image: "/assets/quiz/p1_neutro.webp",
        styles: { minimal: 3, japandi: 2 }
      },
      {
        id: "p1_opt2",
        label: { es: "Cálida & Terrenal", en: "Warm & Earthy" },
        sublabel: { es: "Conexión orgánica con la naturaleza", en: "Organic connection with nature" },
        image: "/assets/quiz/p1_organico.webp",
        styles: { balines: 3, mediterraneo: 2 }
      },
      {
        id: "p1_opt3",
        label: { es: "Sobria & Sofisticada", en: "Sober & Sophisticated" },
        sublabel: { es: "Contraste visual y carácter", en: "Visual contrast and character" },
        image: "/assets/quiz/p1_oscuro.webp",
        styles: { industrial: 3, contemporaneo: 2 }
      }
    ]
  },
  {
    id: 2,
    title: {
      es: "¿Qué tonalidades te inspiran más para tu espacio?",
      en: "Which color tones inspire you most for your space?"
    },
    subtitle: {
      es: "Selecciona hasta 3 colores para definir tu paleta",
      en: "Select up to 3 colors to define your palette"
    },
    type: "multiple",
    maxSelections: 3,
    options: [
      { id: "c1", label: { es: "Arena / Lino", en: "Sand / Linen" }, hex: "#E5D9C5", styles: { minimal: 2, japandi: 3 } },
      { id: "c2", label: { es: "Negro Azabache", en: "Jet Black" }, hex: "#1A1A1A", styles: { industrial: 3, contemporaneo: 2 } },
      { id: "c3", label: { es: "Verde Oliva", en: "Olive Green" }, hex: "#556B2F", styles: { balines: 3, organico: 2 } },
      { id: "c4", label: { es: "Terracota", en: "Terracotta" }, hex: "#C86D51", styles: { mediterraneo: 3 } },
      { id: "c5", label: { es: "Gris Hormigón", en: "Concrete Grey" }, hex: "#8C8C8C", styles: { industrial: 2, minimal: 2 } },
      { id: "c6", label: { es: "Madera Nogal", en: "Walnut Wood" }, hex: "#4A3525", styles: { contemporaneo: 3, balines: 1 } }
    ]
  }
];