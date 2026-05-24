import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Button, { buttonColors } from "../components/ui/Button.jsx";
import Footer from "../components/layout/Footer";
import { getProductBySlug } from "../services/products";
import { useCart } from "../context/CartContext";

export default function ArtworkDetail() {
  const { slug } = useParams();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadArtwork() {
      try {
        const data = await getProductBySlug(slug);
        setArtwork(data);
      } catch (error) {
        console.error("Error cargando obra:", error);
        setArtwork(null);
      } finally {
        setLoading(false);
      }
    }

    loadArtwork();
  }, [slug]);

  console.log("SLUG URL:", slug);
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Cargando obra...
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="h-screen flex items-center justify-center">
        Obra no encontrada
      </div>
    );
  }

   return (
    <div className="min-h-screen flex flex-col bg-[#e9dfd8] pt-24">

      {/* HEADER */}
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">

        {loading && (
          <div className="text-center">Cargando obra...</div>
        )}

        {!loading && !artwork && (
          <div className="text-center">Obra no encontrada</div>
        )}

        {!loading && artwork && (
          <div className="grid md:grid-cols-2 gap-10">

            {/* IMAGEN */}
            <div>
              <img
                src={artwork.image_url}
                alt={artwork.name}
                className="w-full rounded-2xl shadow-lg object-cover"
              />
            </div>

            {/* INFO */}
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
                    color={buttonColors.green}
                    size="md"
                    className="flex-1"
                  >
                    Buy Now
                  </Button>

                  {/* ADD TO CART */}
                  <Button
                    color={buttonColors.orange}
                    size="md"
                    className="flex-1"
                    onClick={() => addToCart(artwork)}>
                    Add to Cart 🛒
                  </Button>

                </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}