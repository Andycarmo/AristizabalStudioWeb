import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#e9dfd8] text-studio-green pt-24">

      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-24">

        {/* ===== SECCIÓN 1 ===== */}
        <section className="
          grid md:grid-cols-2 gap-12 items-center
          p-6 md:p-10
          bg-white/40
          backdrop-blur-sm
          rounded-2xl
          shadow-lg
        ">

          {/* TEXTO */}
          <div className="fade-up-1">
            <h2 className="font-cocomat text-3xl md:text-4xl mb-6">
              About the Studio
            </h2>
            <p className="leading-relaxed opacity-80">
              This is a creative space where ideas take shape through color,
              texture, and storytelling. Each piece is crafted with intention,
              blending traditional techniques with a contemporary artistic vision.
            </p>
          </div>

          {/* IMAGEN */}
          <div className="fade-up-2">
            <img
              src="/gallery/artista/floor-02.webp"
              alt="studio"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full max-w-md mx-auto h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>

        </section>

        {/* ===== SECCIÓN 2 ===== */}
        <section className="
          grid md:grid-cols-2 gap-12 items-center
          p-6 md:p-10
          bg-white/40
          backdrop-blur-sm
          rounded-2xl
          shadow-lg
        ">

          {/* IMAGEN */}
          <div className="fade-up-1 md:order-1">
            <img
              src="/gallery/artista/taller-03.webp"
              alt="process"
              loading="lazy"
              decoding="async"
              className="w-full max-w-md mx-auto h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* TEXTO */}
          <div className="fade-up-2 md:order-2">
            <h2 className="font-cocomat text-3xl md:text-4xl mb-6">
              Creative Process
            </h2>
            <p className="leading-relaxed opacity-80">
              Every artwork begins with observation and emotion. The process
              evolves through sketching, layering, and experimentation,
              allowing each piece to develop its own personality and rhythm.
            </p>
          </div>

        </section>

        {/* ===== SECCIÓN 3 ===== */}
        <section className="
          grid md:grid-cols-2 gap-12 items-center
          p-6 md:p-10
          bg-white/40
          backdrop-blur-sm
          rounded-2xl
          shadow-lg
        ">

          {/* TEXTO */}
          <div className="fade-up-1">
            <h2 className="font-cocomat text-3xl md:text-4xl mb-6">
              Vision & Inspiration
            </h2>
            <p className="leading-relaxed opacity-80">
              Inspired by nature, everyday moments, and vibrant color palettes,
              the goal is to create pieces that feel alive — inviting viewers to
              connect, interpret, and imagine their own stories.
            </p>
          </div>

          {/* IMAGEN */}
          <div className="fade-up-2">
            <img
              src="/gallery/artista/floor-01.webp"
              alt="inspiration"
                loading="lazy"
                decoding="async"
              className="w-full max-w-md mx-auto h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}