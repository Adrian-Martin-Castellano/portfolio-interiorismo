export interface QuizOption {
  id: string;
  label: { es: string; en: string };
  sublabel?: { es: string; en: string };
  image?: string;
  hex?: string;
  styles: Record<string, number>;
}

export interface SliderOption {
  id: string;
  label: { es: string; en: string };
  sublabel?: { es: string; en: string };
  minLabel: { es: string; en: string }; 
  maxLabel: { es: string; en: string }; 
  defaultValue?: number;
  getStyles: (value: number) => Record<string, number>;
}

export interface Question {
  id: number;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  type: 'single' | 'multiple' | 'slider_group';
  maxSelections?: number;
  options?: QuizOption[];
  sliders?: SliderOption[];
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
  },
  {
    id: 4,
    title: {
      es: "Al tocar y sentir los materiales de tu hogar ideal, ¿cuáles prefieres?",
      en: "When touching and feeling the materials of your ideal home, which do you prefer?"
    },
    subtitle: {
      es: "Selecciona la combinación de texturas que más te conecta (1 opción)",
      en: "Select the combination of textures that resonates most with you (1 choice)"
    },
    type: "single",
    options: [
      {
        id: "p4_opt1",
        label: { es: "Orgánicos & Artesanales", en: "Organic & Handcrafted" },
        sublabel: { es: "Maderas nobles sin tratar, piedra natural, lino crudo y barro", en: "Raw noble woods, natural stone, raw linen, and terracotta" },
        image: "/assets/quiz/p4_organico.png",
        styles: { wabi_sabi: 3, balines: 3, mediterraneo: 2, rustico: 2 }
      },
      {
        id: "p4_opt2",
        label: { es: "Lisos, Limpios & Pulidos", en: "Smooth, Clean & Polished" },
        sublabel: { es: "Microcemento, cristal, superficies continuas y acabados mate", en: "Microcement, glass, seamless surfaces, and matte finishes" },
        image: "/assets/quiz/p4_pulido.png",
        styles: { minimal: 3, escandinavo: 2, japandi: 2 }
      },
      {
        id: "p4_opt3",
        label: { es: "Estructurales & Con Carácter", en: "Structural & Bold" },
        sublabel: { es: "Hormigón visto, acero negro, ladrillo y cuero envejecido", en: "Exposed concrete, black steel, brick, and aged leather" },
        image: "/assets/quiz/p4_industrial.png",
        styles: { industrial: 3, contemporaneo: 2 }
      },
      {
        id: "p4_opt4",
        label: { es: "Nobles & Sofisticados", en: "Noble & Sophisticated" },
        sublabel: { es: "Mármoles vetados, madera de nogal, terciopelo y destellos en latón", en: "Veined marble, walnut wood, velvet, and brass accents" },
        image: "/assets/quiz/p4_lujo.png",
        styles: { art_deco: 3, contemporaneo: 3 }
      }
    ]
  },
  {
    id: 5,
    title: {
      es: "Ajusta las escalas según tus preferencias de estilo de vida",
      en: "Adjust the scales according to your lifestyle preferences"
    },
    subtitle: {
      es: "Desliza del 1 al 10 para indicar tu grado de afinidad con cada aspecto",
      en: "Slide from 1 to 10 to indicate your level of affinity with each aspect"
    },
    type: "slider_group",
    sliders: [
      {
        id: "s1_nature",
        label: {
          es: "¿Cuánto te atrae la presencia de naturaleza y plantas?",
          en: "How much do you value the presence of nature and greenery?"
        },
        sublabel: {
          es: "Integración de vegetación, frescura y luz solar",
          en: "Greenery integration, freshness, and sunlight"
        },
        minLabel: { es: "1 - Urbano / Mínimo", en: "1 - Urban / Minimal" },
        maxLabel: { es: "10 - Oasis / Abundante", en: "10 - Oasis / Abundant" },
        defaultValue: 5,
        getStyles: (val: number): Record<string, number> => {
          if (val >= 8) return { balines: 3, mediterraneo: 3, rustico: 2, japandi: 1 };
          if (val >= 5) return { escandinavo: 2, japandi: 2, mediterraneo: 1 };
          return { minimal: 2, industrial: 2, contemporaneo: 2 };
        }
      },
      {
        id: "s2_contrast",
        label: {
          es: "¿Qué nivel de contraste y tonos oscuros prefieres?",
          en: "What level of contrast and dark tones do you prefer?"
        },
        sublabel: {
          es: "Superficies oscuras, sombras marcadas y dramatismo visual",
          en: "Dark surfaces, strong shadows, and visual drama"
        },
        minLabel: { es: "1 - Suave / Claro", en: "1 - Soft / Light" },
        maxLabel: { es: "10 - Sobrio / Oscuro", en: "10 - Sober / Dark" },
        defaultValue: 5,
        getStyles: (val: number): Record<string, number> => {
          if (val >= 8) return { industrial: 3, contemporaneo: 3, art_deco: 2 };
          if (val >= 5) return { mediterraneo: 1, rustico: 1 };
          return { minimal: 3, escandinavo: 3, japandi: 2 };
        }
      },
      {
        id: "s3_craft",
        label: {
          es: "¿Cuánto valoras lo artesanal y las texturas imperfectas?",
          en: "How much do you value handcrafted items and raw textures?"
        },
        sublabel: {
          es: "Cerámicas hechas a mano, maderas vivas y piezas únicas",
          en: "Handmade ceramics, raw woods, and unique pieces"
        },
        minLabel: { es: "1 - Pulido / Perfecto", en: "1 - Polished / Perfect" },
        maxLabel: { es: "10 - Orgánico / Artesanal", en: "10 - Organic / Handcrafted" },
        defaultValue: 5,
        getStyles: (val: number): Record<string, number> => {
          if (val >= 8) return { wabi_sabi: 3, rustico: 3, balines: 2, japandi: 1 };
          if (val >= 5) return { mediterraneo: 2, japandi: 2 };
          return { minimal: 3, contemporaneo: 2, art_deco: 2 };
        }
      }
    ]
  }
];