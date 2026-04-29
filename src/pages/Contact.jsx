import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white pt-24">
    <div className="bg-[#e9dfd8] min-h-screen">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        {/* FORMULARIO */}
        <div>
          <h2 className="text-4xl md:text-5xl font-cocomat text-[#e88c95] mb-10 leading-tight">
            Let’s turn <br /> ideas into art! 
          </h2>

          <form className="space-y-6">

            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Name
              </label>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name (required)"
                  className="w-full bg-white/70 p-3 outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name (required)"
                  className="w-full bg-white/70 p-3 outline-none"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email (required)
              </label>
              <input
                type="email"
                className="w-full bg-white/70 p-3 outline-none"
              />
            </div>

            {/* CHECK */}
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-sm">
                Sign up for news and updates
              </span>
            </div>

            {/* SUBJECT */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Subject (required)
              </label>
              <input
                type="text"
                className="w-full bg-white/70 p-3 outline-none"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Message (required)
              </label>
              <textarea
                rows="5"
                className="w-full bg-white/70 p-3 outline-none resize-none"
              ></textarea>
            </div>

            {/* BUTTON */}
            <button className="bg-black text-white px-6 py-3 mt-4 hover:opacity-80 transition">
              Submit
            </button>

          </form>
        </div>

        {/* IMAGEN */}
        <div className="flex justify-center">
          <img
            src="/gallery/obras/flower-16.webp"
            alt="Artwork"
            className="w-full max-w-md object-cover shadow-lg"
          />
        </div>

      </section>

      <Footer />
    </div>
    </div>
  );
}