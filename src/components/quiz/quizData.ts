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
      { id: "c2", label: { es: "Arena / Lino", en: "Sand / Linen" }, hex: "#E5D9C5", styles: { japandi: 3, wabi_sabi: 2, mediterraneo: 1, rustico: 1, balines: 1 } },
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
          return { minimal: 2, industrial: 2, contemporaneo: 2, art_deco: 1 };
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
          return { minimal: 3, escandinavo: 3, japandi: 2, wabi_sabi: 1 };
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
          if (val >= 5) return { mediterraneo: 2, japandi: 2, escandinavo: 1 };
          return { minimal: 3, contemporaneo: 2, art_deco: 2, industrial: 1 };
        }
      }
    ]
  },
  {
    id: 6,
    title: {
      es: "¿Cuál es tu relación real con los objetos diarios y la organización?",
      en: "What is your real relationship with daily items and organization?"
    },
    subtitle: {
      es: "Elige la filosofía de almacenaje que mejor encaja con tus hábitos (1 opción)",
      en: "Choose the storage philosophy that best fits your habits (1 choice)"
    },
    type: "single",
    options: [
      {
        id: "p6_opt1",
        label: { es: "Oculto & Panelado", en: "Hidden & Panelled" },
        sublabel: { es: "Todo integrado tras armarios invisibles; la vista debe quedar despejada", en: "Everything integrated behind invisible doors; clean lines only" },
        image: "/assets/quiz/p6_oculto.png",
        styles: { minimal: 3, japandi: 2, contemporaneo: 1 }
      },
      {
        id: "p6_opt2",
        label: { es: "Exposición Curada", en: "Curated Display" },
        sublabel: { es: "Estanterías abiertas con libros, cerámica, objetos personales y arte", en: "Open shelving with books, ceramics, personal items, and art" },
        image: "/assets/quiz/p6_exposicion.png",
        styles: { wabi_sabi: 3, escandinavo: 2, rustico: 2 }
      },
      {
        id: "p6_opt3",
        label: { es: "Mecanizado & Funcional", en: "Mechanized & Functional" },
        sublabel: { es: "Sistemas modulares, rieles, estructuras vistas y practicidad urbana", en: "Modular systems, open rails, exposed structures, and urban practicality" },
        image: "/assets/quiz/p6_industrial.png",
        styles: { industrial: 3, contemporaneo: 2 }
      }
    ]
  },
  {
    id: 7,
    title: {
      es: "¿Qué siluetas y formas prefieres que predominen en tus muebles?",
      en: "What silhouettes and shapes do you prefer to dominate your furniture?"
    },
    subtitle: {
      es: "Selecciona el tipo de trazado con el que te sientes más cómodo (1 opción)",
      en: "Select the type of outline you feel most comfortable with (1 choice)"
    },
    type: "single",
    options: [
      {
        id: "p7_opt1",
        label: { es: "Líneas Rectas & Geométricas", en: "Straight & Geometric Lines" },
        sublabel: { es: "Estructuras cuadradas, ángulos definidos y simetría", en: "Square structures, defined angles, and symmetry" },
        image: "/assets/quiz/p7_recto.jpg",
        styles: { minimal: 3, escandinavo: 2, industrial: 2, art_deco: 2 }
      },
      {
        id: "p7_opt2",
        label: { es: "Curvas Orgánicas & Envolventes", en: "Organic & Enveloping Curves" },
        sublabel: { es: "Sofás redondeados, arcos, mesas ovales y bordes suaves", en: "Rounded sofas, arches, oval tables, and soft edges" },
        image: "/assets/quiz/p7_curvo.jpg",
        styles: { japandi: 3, mediterraneo: 3, wabi_sabi: 2, escandinavo: 1 }
      },
      {
        id: "p7_opt3",
        label: { es: "Formas Irregulares & Escultóricas", en: "Irregular & Sculptural Shapes" },
        sublabel: { es: "Piezas singulares con curvas dramáticas o formas naturales sin pulir", en: "Singular pieces with dramatic curves or raw natural forms" },
        image: "/assets/quiz/p7_escultorico.jpg",
        styles: { contemporaneo: 3, balines: 2, art_deco: 1 }
      }
    ]
  },
  {
    id: 8,
    title: {
      es: "Si observas los detalles y cojines de tu sofá ideal, ¿qué textura o patrón predomina?",
      en: "Looking at the details and cushions of your ideal sofa, what texture or pattern dominates?"
    },
    subtitle: {
      es: "Selecciona el acabado textil que mejor complementa tu idea de descanso (1 opción)",
      en: "Select the textile finish that best complements your idea of rest (1 choice)"
    },
    type: "single",
    options: [
      {
        id: "p8_opt1",
        label: { es: "Lino Liso & Tonos Neutros", en: "Smooth Linen & Neutral Tones" },
        sublabel: { es: "Sin estampados, fundas holgadas y tonos beige, crema o marfil", en: "No prints, loose covers, and beige, cream, or ivory tones" },
        image: "/assets/quiz/p8_lino.jpg",
        styles: { minimal: 3, escandinavo: 2, japandi: 2 }
      },
      {
        id: "p8_opt2",
        label: { es: "Bouclé, Trama Gruesa & Tacto Algodón", en: "Bouclé, Chunky Weave & Cotton Touch" },
        sublabel: { es: "Relieve suave, textura aborregada o tejidos de punto acogedores", en: "Soft relief, cozy bouclé texture, or knitted fabrics" },
        image: "/assets/quiz/p8_boucle.jpg",
        styles: { japandi: 3, wabi_sabi: 3, escandinavo: 1 }
      },
      {
        id: "p8_opt3",
        label: { es: "Terciopelo & Brillo Satinado", en: "Velvet & Satin Sheen" },
        sublabel: { es: "Tejidos suntuosos, suaves al tacto y en colores intensos o joya", en: "Sumptuous fabrics, soft touch, and rich or jewel tones" },
        image: "/assets/quiz/p8_terciopelo.jpg",
        styles: { art_deco: 3, contemporaneo: 3 }
      },
      {
        id: "p8_opt4",
        label: { es: "Fibras Naturales & Bordados Artesanales", en: "Natural Fibers & Handcrafted Embroidery" },
        sublabel: { es: "Cojines de yute, borlas, flecos o estampados étnicos/geometría tribal", en: "Jute cushions, tassels, fringes, or ethnic/tribal geometric prints" },
        image: "/assets/quiz/p8_artesanal.jpg",
        styles: { balines: 3, mediterraneo: 3, rustico: 2 }
      },
      {
        id: "p8_opt5",
        label: { es: "Cuero Envejecido & Lona Resistente", en: "Aged Leather & Sturdy Canvas" },
        sublabel: { es: "Cuero en tonos camel o tabaco, costuras gruesas vistas y estética robusta", en: "Camel or tobacco leather, thick exposed stitching, and robust look" },
        image: "/assets/quiz/p8_cuero.jpg",
        styles: { industrial: 3, rustico: 2, contemporaneo: 1 }
      },
      {
        id: "p8_opt6",
        label: { es: "Geometría Gráfica & Estampado Abstracto", en: "Graphic Geometry & Abstract Prints" },
        sublabel: { es: "Patrones geométricos en contraste (blanco/negro, líneas, formas artísticas)", en: "Contrasting geometric patterns (black/white, lines, artistic shapes)" },
        image: "/assets/quiz/p8_geometrico.jpg",
        styles: { contemporaneo: 3, art_deco: 2, escandinavo: 1 }
      }
    ]
  },
  {
    id: 9,
    title: {
      es: "¿Alrededor de qué elemento gravita la vida en tu espacio principal?",
      en: "Around what element does life revolve in your main space?"
    },
    subtitle: {
      es: "Selecciona el punto focal que define cómo disfrutas tu hogar (1 opción)",
      en: "Select the focal point that defines how you enjoy your home (1 choice)"
    },
    type: "single",
    options: [
      {
        id: "p9_opt1",
        label: { es: "Espacio Diáfano & Isla Central", en: "Open Plan & Central Island" },
        sublabel: { es: "Flujo continuo entre cocina y salón, pensado para cocinar y compartir de forma fluida", en: "Seamless flow between kitchen and living, designed for casual cooking and gathering" },
        image: "/assets/quiz/p9_isla.jpg",
        styles: { contemporaneo: 3, industrial: 2, escandinavo: 2 }
      },
      {
        id: "p9_opt2",
        label: { es: "El Refugio del Sofá & Luz Fina", en: "Sofa Haven & Ambient Glow" },
        sublabel: { es: "Disposición recogida y orientada al descanso, la lectura o el bienestar íntimo", en: "Cozy layout centered on rest, reading, or intimate comfort" },
        image: "/assets/quiz/p9_refugio.jpg",
        styles: { japandi: 3, wabi_sabi: 3, minimal: 1 }
      },
      {
        id: "p9_opt3",
        label: { es: "Mesa Amplia & Gran Reunión", en: "Large Table & Social Gathering" },
        sublabel: { es: "Una mesa maciza presidiendo el espacio para sobremesas largas y vida social", en: "A substantial wooden or stone table anchoring the space for long meals and guests" },
        image: "/assets/quiz/p9_mesa.jpg",
        styles: { mediterraneo: 3, rustico: 3, balines: 2 }
      },
      {
        id: "p9_opt4",
        label: { es: "Composición Escénica & Arte Central", en: "Architectural Statement & Focal Point" },
        sublabel: { es: "Disposición simétrica articulada en torno a una chimenea, pieza escultórica o gran ventanal", en: "Symmetrical setup anchored by a fireplace, sculptural piece, or floor-to-ceiling view" },
        image: "/assets/quiz/p9_focal.jpg",
        styles: { art_deco: 3, minimal: 2, industrial: 1 }
      }
    ]
  },
  {
    id: 10,
    title: {
      es: "Si miras las paredes de tu estancia ideal, ¿qué es lo primero que destaca?",
      en: "Looking at the walls of your ideal room, what stands out first?"
    },
    subtitle: {
      es: "Selecciona el tratamiento vertical que mejor define tu estilo visual (1 opción)",
      en: "Select the wall expression that best defines your visual style (1 choice)"
    },
    type: "single",
    options: [
      {
        id: "p10_opt1",
        label: { es: "Paredes Desnudas & Textura de Mortero", en: "Bare Walls & Plaster Texture" },
        sublabel: { es: "Acabados de cal, microcemento o Yeso sin cuadros para destacar la luz y la sombra", en: "Lime wash, subtle plaster, or raw microcement without artwork to emphasize light" },
        image: "/assets/quiz/p10_mortero.jpg",
        styles: { wabi_sabi: 3, minimal: 3, japandi: 2 }
      },
      {
        id: "p10_opt2",
        label: { es: "Cuadro Abstracto de Gran Formato", en: "Large-Scale Abstract Artwork" },
        sublabel: { es: "Una única obra de arte de gran tamaño que aporta carácter sin recargar el espacio", en: "A single oversized statement canvas adding character without clutter" },
        image: "/assets/quiz/p10_arte_grande.jpg",
        styles: { contemporaneo: 3, minimal: 2, industrial: 1 }
      },
      {
        id: "p10_opt3",
        label: { es: "Molduras Clásicas, Espejos & Latón", en: "Classic Moldings, Mirrors & Brass" },
        sublabel: { es: "Paneles arquitectónicos en pared, espejos con marco y detalles dorados", en: "Wainscoting, decorative moldings, framed mirrors, and refined brass touches" },
        image: "/assets/quiz/p10_molduras.jpg",
        styles: { art_deco: 3, contemporaneo: 2 }
      },
      {
        id: "p10_opt4",
        label: { es: "Galería de Cuadros, Tapices & Arte Local", en: "Curated Gallery Wall, Tapestries & Local Crafts" },
        sublabel: { es: "Composición de fotografías, espejos orgánicos, fibras tejidas o piezas artesanales", en: "Collage of framed photos, organic mirrors, woven wall hangings, or artisan crafts" },
        image: "/assets/quiz/p10_galeria.jpg",
        styles: { mediterraneo: 3, balines: 3, escandinavo: 2, rustico: 2 }
      }
    ]
  }
];

export const QUIZ_RESULT_IMAGES: string[] = [
  '/assets/quiz/results/minimal.jpg',
  '/assets/quiz/results/japandi.jpg',
  '/assets/quiz/results/balines.jpg',
  '/assets/quiz/results/mediterraneo.jpg',
  '/assets/quiz/results/industrial.jpg',
  '/assets/quiz/results/contemporaneo.jpg',
  '/assets/quiz/results/wabi_sabi.jpg',
  '/assets/quiz/results/escandinavo.jpg',
  '/assets/quiz/results/art_deco.jpg',
  '/assets/quiz/results/rustico.jpg',
];

export const QUIZ_QUESTION_IMAGES: string[] = QUIZ_QUESTIONS.flatMap((q) =>
  q.options ? q.options.map((opt) => opt.image).filter((img): img is string => Boolean(img)) : []
);

export const ALL_QUIZ_IMAGES: string[] = [
  ...QUIZ_QUESTION_IMAGES,
  ...QUIZ_RESULT_IMAGES,
];