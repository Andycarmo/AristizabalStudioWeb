import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Button, { buttonColors } from "../components/ui/Button.jsx";
import Footer from "../components/layout/Footer";
import { getProducts } from "../services/products";
import { useCart } from "../context/CartContext";

export default function Shop() {
  
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

    // ================= LOAD PRODUCTS =================
  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await getProducts();
      if (error) {
        console.error(error);
      } else {
        setProducts(data);
      }
    }
    loadProducts();
  }, []);

  
  return (
    <div 
      className="
      min-h-screen 
      flex 
      flex-col 
      bg-[#e9dfd8] 
      pt-24">

      <Header />

      <main 
        className="
        flex-1 
        px-10 sm:px-8 md:px-7 lg:px-6
        py-12 
        max-w-7xl 
        mx-auto
        w-full">

        <h1 
        className="
        font-cocomat 
        text-studio-green
        text-3xl 
        md:text-5xl 
        mb-10 
        text-center">
          Shop
        </h1>

        {/* GRID */}
        <div 
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2  
          lg:grid-cols-3
          xl:grid-cols-4
          gap-4 sm:gap-8"
          >

           {products.map((item) => {

            // MAIN IMAGE
            const mainImage = item.images?.find(
              (img) => img.role === "main"
            );

            // HOVER IMAGE
            const hoverImage = item.images?.find(
              (img) => img.role === "hover"
            );

            return (

              

                <div
                  className="
                    group
                    cursor-pointer
                    transform
                    transition-all
                    duration-500
                    hover:scale-105
                  "
                >

                                    {/* CARD */}
                                    <div 
                                      className="
                                      bg-white 
                                      rounded-2xl 
                                      border border-black/5
                                      shadow-[0_12px_40px_rgba(0,0,0,0.08)]
                                      transition-all duration-500
                                      hover:-translate-y-2
                                      hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

                                          <Link
                                            to={`/obra/${item.slug}`}
                                            key={item.id}
                                          >

                                                  {/* IMAGEN */}
                                                  <div 
                                                  className="
                                                  relative 
                                                  m-1.5 sm:m-4 
                                                  aspect-[4/5] sm:aspect-[3/4] 
                                                  bg-[#f8f5f1]
                                                  border border-black/10 
                                                  shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                                                  overflow-hidden">

                                                              {/* MAIN IMAGE */}
                                                              <img
                                                                src={
                                                                  mainImage?.url ||
                                                                  "https://placehold.co/600x800?text=No+Image"
                                                                }
                                                                alt={item.name}
                                                                className={`
                                                                  absolute inset-0 w-full h-full
                                                                  object-cover object-center
                                                                  transition-opacity duration-500
                                                                  ${
                                                                    hoverImage
                                                                      ? "group-hover:opacity-0"
                                                                      : ""
                                                                  }
                                                                `}
                                                              />

                                                                  {/* Imagen hover */}
                                                                  {hoverImage && (
                                                                    <img
                                                                      src={hoverImage.url}
                                                                      alt={item.name}
                                                                      className="
                                                                        absolute inset-0 w-full h-full
                                                                        object-cover object-center
                                                                        opacity-0
                                                                        transition-opacity duration-500
                                                                        group-hover:opacity-100
                                                                      "
                                                                    />
                                                                    )}
                                                </div>
                                            </Link>

                {/* INFO */}
                <div className="p-4">
                  <h2 className="text-sm md:text-base">
                    {item.name}
                  </h2>
                {/* FILA PRECIO + ADD */}
                  <div className="mt-3 flex items-center justify-between gap-3">

                    {/* PRECIO */}
                    <p className="font-bold text-sm md:text-base">
                      {new Intl.NumberFormat(
                        item.currency === "COP" ? "es-CO" : "en-US",
                        {
                          style: "currency",
                          currency: item.currency || "COP",
                          maximumFractionDigits: 0,
                        }
                      ).format(item.price)}
                    </p>

                    {/* ADD SOLO HOVER */}
                    <div
                      className="
                        opacity-0
                        translate-x-2
                        pointer-events-none

                        group-hover:opacity-100
                        group-hover:translate-x-0
                        group-hover:pointer-events-auto

                        transition-all duration-300
                      "
                    >
                      <Button
                         onClick={() => addToCart(item)}
                        color={buttonColors.orange}
                        size="xsb"
                      >
                        Add 🛒
                      </Button>
                    </div>

                  </div>

                  {/* BUY SIEMPRE VISIBLE */}
                  <div className="mt-3">
                    <Button
                       onClick={() => {
                        addToCart(item, false);
                        navigate("/cart");
                      }}
                      color={buttonColors.green}
                      size="xsb"
                    >
                      Buy
                     </Button>

                      </div>

                    </div>

                  </div>

                </div>

              

            );

          })}

        </div>

      </main>

      <Footer />

    </div>
  );
}