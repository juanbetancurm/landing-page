export const defaultLanguage = "en";

export const languages = {
  en: {
    label: {
      en: "English",
      es: "Inglés",
    },
    shortLabel: "EN",
    htmlLang: "en",
  },
  es: {
    label: {
      en: "Spanish",
      es: "Español",
    },
    shortLabel: "ES",
    htmlLang: "es",
  },
};

export const translations = {
  en: {
    document: {
      title: "LabOlavs — Learning tools for everyone",
    },
    home: {
      logoAlt: "LabOlavs Logo",
      tagline: "Learning tools for everyone",
      explore: "Explore",
    },
    themeToggle: {
      light: "Switch to light mode",
      dark: "Switch to dark mode",
    },
    languageToggle: {
      groupLabel: "Language",
      optionLabel: "Show site in {language}",
      selectedLabel: "{language} selected",
    },
    footer: {
      badge: "Connect",
      title: "More on the creator",
      description:
        "A software developer and educator building tools to help teachers, students, and the curious. Open to view profile links.",
      open: "Open",
      legend: "Find the creator around the web",
      github: "GitHub",
      linkedin: "LinkedIn",
      cv: "CV",
    },
    categoryPage: {
      notFound: "Category not found",
      backHome: "Back to home",
      live: "Live",
      comingSoon: "Coming soon",
      emptyCategory:
        "New {category} will appear here as they are deployed.",
      moreComing: "More {category} coming soon",
    },
    guide: {
      helpLabel: "Open introduction guide",
      helpTitle: "Open guide",
      introLabel: "LabOlavs introduction",
      stepCount: "Step {current} of {total}",
      back: "Back",
      skip: "Skip",
      finish: "Finish",
      next: "Next",
    },
    aboutOlav: {
      title: "About Olav",
      description:
        "Software developer and educator building tools to help teachers, students, and the curious.",
    },
  },
  es: {
    document: {
      title: "LabOlavs — Herramientas de aprendizaje para todos",
    },
    home: {
      logoAlt: "Logo de LabOlavs",
      tagline: "Herramientas de aprendizaje para todos",
      explore: "Explorar",
    },
    themeToggle: {
      light: "Cambiar a modo claro",
      dark: "Cambiar a modo oscuro",
    },
    languageToggle: {
      groupLabel: "Idioma",
      optionLabel: "Mostrar el sitio en {language}",
      selectedLabel: "{language} seleccionado",
    },
    footer: {
      badge: "Conectar",
      title: "Más sobre el creador",
      description:
        "Desarrollador de software y educador que crea herramientas para ayudar a docentes, estudiantes y personas curiosas. Abre esta sección para ver sus enlaces de perfil.",
      open: "Abrir",
      legend: "Encuentra al creador en la web",
      github: "GitHub",
      linkedin: "LinkedIn",
      cv: "CV",
    },
    categoryPage: {
      notFound: "Categoría no encontrada",
      backHome: "Volver al inicio",
      live: "En vivo",
      comingSoon: "Próximamente",
      emptyCategory:
        "Los nuevos proyectos de {category} aparecerán aquí cuando se publiquen.",
      moreComing: "Más {category} próximamente",
    },
    guide: {
      helpLabel: "Abrir la guía de introducción",
      helpTitle: "Abrir guía",
      introLabel: "Introducción a LabOlavs",
      stepCount: "Paso {current} de {total}",
      back: "Atrás",
      skip: "Saltar",
      finish: "Finalizar",
      next: "Siguiente",
    },
    aboutOlav: {
      title: "Sobre Olav",
      description:
        "Desarrollador de software y educador que crea herramientas para ayudar a docentes, estudiantes y personas curiosas.",
    },
  },
};

export const isSupportedLanguage = (language) =>
  Object.prototype.hasOwnProperty.call(languages, language);

const getNestedValue = (source, key) =>
  key.split(".").reduce((value, part) => value?.[part], source);

const interpolate = (value, replacements) =>
  Object.entries(replacements).reduce(
    (text, [key, replacement]) =>
      text.replaceAll(`{${key}}`, String(replacement)),
    value
  );

export const translate = (language, key, replacements = {}) => {
  const safeLanguage = isSupportedLanguage(language) ? language : defaultLanguage;
  const value =
    getNestedValue(translations[safeLanguage], key) ??
    getNestedValue(translations[defaultLanguage], key) ??
    key;

  return typeof value === "string" ? interpolate(value, replacements) : value;
};
