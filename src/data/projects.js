const localizedValue = (value, language) => {
  if (typeof value === "string") return value;
  return value[language] ?? value.en;
};

const localizeItem = (item, language) =>
  Object.fromEntries(
    Object.entries(item).map(([key, value]) => [
      key,
      localizedValue(value, language),
    ])
  );

export const categories = [
  {
    id: "games",
    name: {
      en: "Games",
      es: "Juegos",
    },
    description: {
      en: "Educational games to reinforce the concepts.",
      es: "Juegos educativos para reforzar los conceptos.",
    },
    cardIcon: "games",
    icon: "🎮",
    color: "#0F6E56",
    bgColor: "#E1F5EE",
    path: "/category/games",
  },
  {
    id: "education",
    name: {
      en: "Education",
      es: "Educación",
    },
    description: {
      en: "Explanations, simulations, and worksheets.",
      es: "Explicaciones, simulaciones y hojas de trabajo.",
    },
    cardIcon: "education",
    icon: "🎓",
    color: "#185FA5",
    bgColor: "#E6F1FB",
    path: "/category/education",
  },
  {
    id: "apps",
    name: {
      en: "Apps",
      es: "Aplicaciones",
    },
    description: {
      en: "Tools and utilities for everyday use.",
      es: "Herramientas y utilidades para el uso diario.",
    },
    cardIcon: "apps",
    icon: "⚡",
    color: "#534AB7",
    bgColor: "#EEEDFE",
    path: "/category/apps",
  },
];

export const projects = [
  {
    id: "anglemaze",
    title: {
      en: "AngleMaze",
      es: "AngleMaze",
    },
    icon: "maze",
    description: {
      en: "Navigate mazes using angle concepts. A geometry challenge for students.",
      es: "Navega laberintos usando conceptos de ángulos. Un reto de geometría para estudiantes.",
    },
    category: "games",
    status: "live",
    url: "https://anglemaze.labolavs.com",
  },
  {
    id: "dna-translation-laboratory",
    title: {
      en: "DNA Translation Laboratory",
      es: "Laboratorio de Traducción de ADN",
    },
    icon: "dna",
    description: {
      en: "Explore how DNA is translated into proteins through an interactive laboratory with a mutations simulator.",
      es: "Explora cómo el ADN se traduce en proteínas mediante un laboratorio interactivo con un simulador de mutaciones.",
    },
    category: "education",
    status: "live",
    url: "https://translation.labolavs.com",
  },
];

export const getLocalizedCategories = (language) =>
  categories.map((category) => localizeItem(category, language));

export const getLocalizedProjects = (language) =>
  projects.map((project) => localizeItem(project, language));
