const videos = [
  {
    id: 1,
    featured: true,
    youtubeId: "SbTE5x-HXkc",
    title: "RETO PANTONE POSTCARDS | 5 AVES DE COLOMBIA 🦅🦆🦃🐦🌈",
    description:
      "Decidí empezar el RETO PANTONE haciendo un homenaje a la Avifauna de Colombia 🍭🪶🪽🦩 En este video te cuento más del reto y pintamos juntos 5 aves del Amazonas. Acompañame a llenar estas 100 postales Pantone de hermosas aves de mi país",
    date: "2026-06-29",
  },

  {
    id: 2,
    featured: false,
    youtubeId: "rOQNUzP5FZ8",
    title: "Porque necesitas un mini sketchbook? 📗📕✨🎨 PINTEMOS JUNTOS",
    description:
      "¿Aún no te decides si comprar un mini sketchbook📔📓 En el video de hoy te muestro el que tengo yo y te cuento mi experiencia usándolo con diferentes medios.",
    date: "May 2026",
  },

  {
    id: 3,
    featured: false,
    youtubeId: "0ddX-2-wKrc",
    title: "Nacidos para ser artistas, forzados a ignorarlo",
    description:
      "La creatividad es un músculo que requiere ejercicio y atención. Todos somos lo suficientemente creativos para producir el arte que tanto admiramos, solo que aun no lo sabemos 👀 En el libro EL CAMINO DEL ARTISTA (1992) de Julia Cameron encontraremos 12 semanas de herramientas y ejercicios para recuperar la creatividad. Hoy hablamos de las herramientas básicas y sobre los ejercicios de la primera semana.",
    date: "April 2026",
  },
];

export const getThumbnail = (youtubeId) =>
  `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

export const getVideoUrl = (youtubeId) =>
  `https://www.youtube.com/watch?v=${youtubeId}`;

export default videos;