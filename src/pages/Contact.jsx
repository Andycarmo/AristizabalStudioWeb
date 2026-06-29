import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { supabase } from "../config/supabase";
import { useState } from "react";

export default function Contact() {

// ================= ADD STATE =================
const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
});

const [loading, setLoading] = useState(false);

  // ================= HANDLECHANGE =================
  function handleChange(e) {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      }

      async function handleSubmit(e) {
        e.preventDefault();

        try {
          setLoading(true);

          if (
            !form.firstName ||
            !form.lastName ||
            !form.email ||
            !form.subject ||
            !form.message
          ) {
            alert("Please complete all required fields");
            return;
          }

          const res = await fetch(
            "https://nkwrirxvidvkjphwtuwd.supabase.co/functions/v1/contact-form",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                subject: form.subject,
                message: form.message,
              }),
            }
          );

         const data = await res.json();

console.log("FUNCTION RESPONSE:", data);

if (!res.ok) {
  throw new Error(JSON.stringify(data));
}

          alert("Message sent successfully");

          setForm({
            firstName: "",
            lastName: "",
            email: "",
            subject: "",
            message: "",
          });

        } catch (error) {
          console.error(error);
          alert(error.message || "Error sending message");
        } finally {
          setLoading(false);
        }
    
}
  return (
    <div className="min-h-screen bg-white pt-24">
    <div className="bg-[#e9dfd8] min-h-screen">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        {/* FORMULARIO */}
        <div>
          <h2 className="
          font-cocomat font-bold
          text-studio-green
          text-4xl 
          md:text-5xl 
          mb-10 
          leading-tight">
            Let’s turn <br /> ideas into art! 
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Name
              </label>

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="First Name (required)"
                  className="w-full bg-white/70 p-3 outline-none"
                />
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
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
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Dirección de correo electrónico"
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
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="¿En qué puedo ayudarte?"
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
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                className="w-full bg-white/70 p-3 outline-none resize-none"
              ></textarea>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
               className="
                bg-black
                text-white
                px-6
                py-3
                mt-4
                hover:opacity-80
                transition
                disabled:opacity-50
              "
            >
              {loading ? "Sending..." : "Submit"}
            </button>

          </form>
        </div>

        {/* IMAGEN */}
        <div className="flex justify-center">
          <img
            src="/gallery/obras/flores/flower-16.webp"
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