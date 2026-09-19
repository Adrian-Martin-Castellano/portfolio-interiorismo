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
        sublabel: { es: "Elegancia neutra, orden y serenidad", en: "Neutral elegance, order, and serenity" },
        image: "/assets/quiz/p1_neutro.jpg",
        styles: { minimal: 3, japandi: 3, escandinavo: 2 }
      },
      {
        id: "p1_opt2",
        label: { es: "Cálida & Terrenal", en: "Warm & Earthy" },
        sublabel: { es: "Conexión orgánica y texturas naturales", en: "Organic connection and natural textures" },
        image: "/assets/quiz/p1_organico.jpg",
        styles: { balines: 3, mediterraneo: 2, rustico: 2, wabi_sabi: 1 }
      },
      {
        id: "p1_opt3",
        label: { es: "Sobria & Sofisticada", en: "Sober & Sophisticated" },
        sublabel: { es: "Contraste visual, carácter y exclusividad", en: "Visual contrast, character, and exclusivity" },
        image: "/assets/quiz/p1_oscuro.jpg",
        styles: { industrial: 3, contemporaneo: 3, art_deco: 2 }
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
      { id: "c1", label: { es: "Blanco Marfil", en: "Ivory White" }, hex: "#F5F2EB", styles: { minimal: 3, escandinavo: 2, japandi: 1 } },
      { id: "c2", label: { es: "Arena / Lino", en: "Sand / Linen" }, hex: "#E5D9C5", styles: { japandi: 3, wabi_sabi: 2, mediterraneo: 1 } },
      { id: "c3", label: { es: "Verde Salvia", en: "Sage Green" }, hex: "#9CAF88", styles: { escandinavo: 2, japandi: 2, balines: 1 } },
      { id: "c4", label: { es: "Verde Oliva", en: "Olive Green" }, hex: "#556B2F", styles: { balines: 3, rustico: 2, mediterraneo: 1 } },
      { id: "c5", label: { es: "Terracota Warm", en: "Warm Terracotta" }, hex: "#C86D51", styles: { mediterraneo: 3, rustico: 2 } },
      { id: "c6", label: { es: "Azul Profundo", en: "Deep Blue" }, hex: "#1C2D37", styles: { contemporaneo: 3, art_deco: 2 } },
      { id: "c7", label: { es: "Gris Hormigón", en: "Concrete Grey" }, hex: "#8C8C8C", styles: { industrial: 3, minimal: 2 } },
      { id: "c8", label: { es: "Madera Roble", en: "Oak Wood" }, hex: "#B88A58", styles: { escandinavo: 3, japandi: 2, balines: 1 } },
      { id: "c9", label: { es: "Madera Nogal / Dorados", en: "Walnut & Brass" }, hex: "#4A3525", styles: { art_deco: 3, contemporaneo: 2 } },
      { id: "c10", label: { es: "Negro Azabache", en: "Jet Black" }, hex: "#1A1A1A", styles: { industrial: 3, contemporaneo: 2, art_deco: 1 } }
    ]
  },
  {
    id: 3,
    title: {
      es: "¿Qué tipo de atmósfera e iluminación te hace sentir más cómodo?",
      en: "What kind of atmosphere and lighting makes you feel most at ease?"
    },
    subtitle: {
      es: "Selecciona el tipo de luz y espacio con el que más conectas (1 opción)",
      en: "Select the light and space type you connect with most (1 choice)"
    },
    type: "single",
    options: [
      {
        id: "p3_opt1",
        label: { es: "Luz Natural & Amplitud", en: "Natural Light & Spaciousness" },
        sublabel: { es: "Ventanales amplios, espacios limpios y sensación diáfana", en: "Large windows, clean spaces, and an open feel" },
        image: "/assets/quiz/p3_luz_natural.jpg",
        styles: { minimal: 3, escandinavo: 3, mediterraneo: 2 }
      },
      {
        id: "p3_opt2",
        label: { es: "Cálida & Intimista", en: "Warm & Intimate" },
        sublabel: { es: "Iluminación tenue, sombras suaves y texturas orgánicas", en: "Dim lighting, soft shadows, and organic textures" },
        image: "/assets/quiz/p3_luz_tenue.jpg",
        styles: { japandi: 3, wabi_sabi: 3, rustico: 1 }
      },
      {
        id: "p3_opt3",
        label: { es: "Focal & Dramática", en: "Focal & Dramatic" },
        sublabel: { es: "Contrastes marcados, luz indirecta y toques metalizados", en: "Bold contrasts, indirect lighting, and metallic hints" },
        image: "/assets/quiz/p3_luz_focal.jpg",
        styles: { industrial: 3, contemporaneo: 3, art_deco: 2 }
      },
      {
        id: "p3_opt4",
        label: { es: "Tamizada & Sensorial", en: "Filtered & Sensory" },
        sublabel: { es: "Luz suave con vegetación y conexión directa con el exterior", en: "Soft light with greenery and direct outdoor connection" },
        image: "/assets/quiz/p3_luz_tamizada.png",
        styles: { balines: 3, mediterraneo: 3, rustico: 2 }
      }
    ]
  }
];