const localizedValue = (value, language) => {
  if (typeof value === "string" || value === undefined) return value;
  return value[language] ?? value.en;
};

const localizeGuideStep = (step, language) =>
  Object.fromEntries(
    Object.entries(step).map(([key, value]) => [
      key,
      localizedValue(value, language),
    ])
  );

export const guideSteps = [
  {
    id: "general-description",
    target: "[data-guide='hero']",
    isIntro: true,
    text: {
      en: "LabOlavs is for teachers, students, and anyone looking for free content to teach and learn.",
      es: "LabOlavs es para docentes, estudiantes y cualquier persona que busque contenido gratuito para enseñar y aprender.",
    },
    placement: "bottom",
  },
  {
    id: "sections-description",
    target: "[data-guide='explore']",
    title: {
      en: "Three main sections",
      es: "Tres secciones principales",
    },
    text: {
      en: "Games are for interactive learning, Education is for explanations and worksheets, and Apps are useful tools.",
      es: "Juegos es para aprender de forma interactiva, Educación ofrece explicaciones y hojas de trabajo, y Aplicaciones reúne herramientas útiles.",
    },
    placement: "top",
  },
  {
    id: "theme-button",
    target: "[data-guide='theme']",
    title: {
      en: "Change the theme",
      es: "Cambia el tema",
    },
    text: {
      en: "Use this button to switch between light and dark mode.",
      es: "Usa este botón para cambiar entre modo claro y modo oscuro.",
    },
    placement: "left",
  },
  {
    id: "about-olav",
    target: "[data-guide='about-open']",
    title: {
      en: "Questions, support, or want to help?",
      es: "¿Preguntas, apoyo o ganas de ayudar?",
    },
    text: {
      en: "Open this section to find the creator's links for questions, support, or helping LabOlavs grow.",
      es: "Abre esta sección para encontrar los enlaces del creador si tienes preguntas, necesitas apoyo o quieres ayudar a que LabOlavs crezca.",
    },
    placement: "top",
  },
  {
    id: "help-button",
    target: "[data-guide='help']",
    title: {
      en: "Open this guide again",
      es: "Abre esta guía de nuevo",
    },
    text: {
      en: "Need these instructions again? Press this question mark button to open the guide anytime.",
      es: "¿Necesitas estas instrucciones otra vez? Presiona este botón con signo de pregunta para abrir la guía cuando quieras.",
    },
    placement: "left",
  },
];

export const getLocalizedGuideSteps = (language) =>
  guideSteps.map((step) => localizeGuideStep(step, language));
