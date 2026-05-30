import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import Button, { buttonColors } from "../components/ui/Button.jsx";

import { getProductBySlug } from "../services/products";
import { useCart } from "../context/CartContext";

export default function ArtworkDetail() {

  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ================= LOAD ARTWORK =================
  useEffect(() => {
    async function loadArtwork() {
      try {
        const data = await getProductBySlug(slug);
        setArtwork(data);
        
        // MAIN IMAGE
         const mainImage =
          data.images?.find(
            (img) => img.role === "main"
          )?.url || "";

        setSelectedImage(mainImage);

      } catch (error) {
        console.error("Error cargando obra:", error);
        setArtwork(null);
      } finally {
        setLoading(false);
      }
    }

    loadArtwork();
  }, [slug]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Cargando obra...
      </div>
    );
  }
// ================= NOT FOUND =================
  if (!artwork) {
    return (
      <div className="h-screen flex items-center justify-center">
        Obra no encontrada
      </div>
    );
  }

  // ================= ALL IMAGES =================
  const images =
    artwork.images?.map((img) => img.url) || [];

  // ================= MAIN IMAGE =================
  const mainImage =
    artwork.images?.find(
      (img) => img.role === "main"
    )?.url || "";

   return (
    <div className="min-h-screen flex flex-col bg-[#e9dfd8] pt-24">

      {/* HEADER */}
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT COLUMN */}
          <div>

            {/* MAIN IMAGE */}
          <div>

            <img
              src={selectedImage || mainImage}
              alt={artwork.name}
              className="
                w-full
                rounded-2xl
                shadow-lg
                object-cover
              "
            />

          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4 flex-wrap">

            {images.map((img, i) => (

              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`
                  w-16 h-16
                  object-cover
                  rounded-lg
                  cursor-pointer
                  border-2
                  transition

                  ${
                    selectedImage === img
                      ? "border-black"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }
                `}
              />

            ))}

          </div>
        </div>


             {/* RIGHT COLUMN */}
            <div className="space-y-6">

              <h1 className="text-3xl font-bold">
                {artwork.name}
              </h1>

              <p className="text-gray-700">
                {artwork.description}
              </p>

              <div className="space-y-2 text-sm">

                <p>
                  <span className="text-gray-500">Técnica:</span>{" "}
                  {artwork.technique}
                </p>

                <p>
                  <span className="text-gray-500">Dimensiones:</span>{" "}
                  {artwork.dimensions}
                </p>

                <p>
                  <span className="text-gray-500">Estado:</span>{" "}
                  <span className={artwork.available ? "text-green-600" : "text-red-500"}>
                    {artwork.available ? "Disponible" : "No disponible"}
                  </span>
                </p>

              </div>

              {/* ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">

                  {/* BUY NOW */}
                  <Button
                   onClick={() => {
                    addToCart(artwork, false);
                    navigate("/cart");
                  }}
                    color={buttonColors.green}
                    size="md"
                    className="flex-1"
                  >
                    Buy Now
                  </Button>

                  {/* ADD TO CART */}
                  <Button
                    onClick={() => addToCart(artwork)}
                    color={buttonColors.orange}
                    size="md"
                    className="flex-1">
                    Add to Cart 🛒
                  </Button>

            </div>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}