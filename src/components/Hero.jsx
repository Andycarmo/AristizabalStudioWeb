export default function Hero() {
  return (
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">

      {/* 🔥 FONDO FIJO */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Cuadro-Hero.webp')",
          backgroundAttachment: "fixed",
        }}
      />

      {/* 🔥 OVERLAY OSCURO */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 🔥 CONTENIDO */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wide">
          Arte que inspira
        </h2>
      </div>

    </section>
  );
}