import { useEffect, useState, useRef } from "react";
import { optimizeImage,} from "../../utils/imageOptimizer";
import AdminLayout from "../layouts/AdminLayout";
import ProductMessages from "../components/ProductMessages";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { supabase } from "../../config/supabase";
import Swal from "sweetalert2";

//lOAD => 45 
//RESET => 94
//CREATE => 120
//DELETE => 473 - {416 - 499}

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/products";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState("COP");
  const [images, setImages] = useState([]);
  const [optimizationSummary, setOptimizationSummary] = useState(null);
  const [showOptimizationDetails, setShowOptimizationDetails] = useState(false);
  const [technique, setTechnique] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    dimensions: "",
    description: "",
    product_type: "artwork",
    sku: "",
  });

  // ================= STATES =================
const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const [editingProduct, setEditingProduct] = useState(null);
const [successMessage, setSuccessMessage] = useState("");
const [inputKey, setInputKey] = useState(Date.now());
const messageRef = useRef(null);

  // ================= REFS =================
const imageInputRef = useRef(null);

  // ================= LOAD PRODUCTS=================
  async function loadProducts() {

              const { data, error } = await getProducts();

              if (error) {
                console.log(error);
                return;
              }

              setProducts(data || []);
            }

            useEffect(() => {
            loadProducts();
            }, []);


// ================= HANDLE IMAGE CHANGE =================

  async function handleImageChange(e) {
        const files = Array.from(e.target.files);
        const optimizedImages = await Promise.all(
          files.map(async (file) => {
            const optimized = await optimizeImage(
              file,
              form.product_type
            );
            return {
              file: optimized.file,
              preview: optimized.preview,
              role: "gallery",
              stats: optimized,
            };
          })
        );
        const updatedImages = [
            ...images,
            ...optimizedImages,
          ];
          setImages(updatedImages);
      
        /*
  ============================
  RESUMEN GLOBAL
  ============================
  */

      const originalBytes = updatedImages.reduce(

        (acc, img) => acc + img.stats.original.size,

        0

      );

      const optimizedBytes = updatedImages.reduce(

        (acc, img) => acc + img.stats.result.size,

        0

      );

      const optimizedCount = updatedImages.filter(
        img => img.stats?.optimized
      ).length;

      const alreadyOptimizedCount = updatedImages.filter(
        img => !img.stats?.optimized
      ).length;

        setOptimizationSummary({

          totalImages: optimizedCount,

          alreadyOptimized: alreadyOptimizedCount,

          originalBytes,

          optimizedBytes,

          reduction: (
            (1 - optimizedBytes / originalBytes) * 100
          ).toFixed(1),

          details: updatedImages,

        });

    }
// ================= HANDLE IMAGE CHANGE =================================
function setImageRole(index, role) {
  setImages(prev =>
    prev.map((img, i) =>
      i === index ? { ...img, role } : img
    )
  );
}

  // ================= HANDLE INPUT =================
  function handleChange(e) {

            setForm({
              ...form,
              [e.target.name]: e.target.value,
            });
          }

// ================= LIMPIAR CAMPOS =================
  function resetForm() {
          setForm({
            name: "",
            price: "",
            height: "",
            width: "",
            description: "",
            product_type: "artwork",
            sku: "",
            
          });

          setImages([]); // limpia imágenes con roles (MAIN / HOVER / GALLERY)

          setEditingProduct(null);
          setTechnique("");

          // limpia errores si tienes
          setErrorMessage("");
        
          // limpia input file visualmente
          setInputKey(Date.now());
          
          // Resumen de optimización
          setOptimizationSummary(null);
          setShowOptimizationDetails(false);
        
        }

      // ================= CREATE PRODUCT =================
    async function handleCreateProduct() {
            try {
              setLoading(true);
              setErrorMessage("");

              // ================= VALIDATIONS ================= 
              if (!form.height || !form.width) { setErrorMessage("Debes agregar dimensiones"); return; }
              if (!images.length) { setErrorMessage("Debes agregar imágenes"); return; }

              const mainImage = images.find(i => i.role === "main");

              if (!mainImage) {
                setErrorMessage("Debes seleccionar MAIN image");
                setTimeout(() => {
                messageRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }, 100);
                return;
              }

              // ================= SUBIR IMAGENES =================
              let uploadedImages = [];

              for (let img of images) {

                // 🔥 EXISTING IMAGE
                  if (!img.file) {

                    uploadedImages.push({
                      url: img.url,
                      role: img.role,
                    });

                    continue;
                  }

                  // 🔥  ================= NEW IMAGE =================
                  const originalName = img.file.name
                    .replace(/\.[^/.]+$/, "");
                  const fileName =
                    `${Date.now()}-${originalName}.webp`;
                    

                  const { error } = await supabase.storage
                    .from("products")
                    .upload(fileName, img.file);

                  if (error) {
                    setErrorMessage(error.message);
                    setTimeout(() => {
                    messageRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }, 100);
                    return;
                  }

                  const { data } = supabase.storage
                    .from("products")
                    .getPublicUrl(fileName);

                  uploadedImages.push({
                    url: data.publicUrl,
                    role: img.role,
                  });
              
              }

              // ================= GUARDAR EN BD =================
              const { error } = await createProduct({
                name: form.name, 
                description: form.description,
                slug: form.name.toLowerCase().trim().replace(/\s+/g, "-"),
                price: Number(String(form.price).replace(/\D/g, "")),
                // 🔥 NEW DIMENSIONS SYSTEM 
                dimensions: `${form.height} x ${form.width} cm`,
                images: uploadedImages,
                technique,
                product_type: form.product_type,
                sku: form.sku,
              });

              if (error) {
                setErrorMessage(error.message);
                setTimeout(() => {
                  messageRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }, 100);
                return;
              }

              // SUCCESS
          setSuccess(true);
          setSuccessMessage("Product saved successfully");

            setTimeout(() => {
            setSuccess(false);
            setSuccessMessage("");
            }, 3000);

              // 4. 🔥 AQUÍ VA EL RESET (IMPORTANTE)
              resetForm();

              // ================= RECARGAR LISTA =================
              loadProducts();

              
            } catch (err) {
              setErrorMessage("Unexpected error");
            } finally {
              setLoading(false);
            }
          }
  // ================= EDIT CLICK =================
      function handleEditClick(product) {

                  setEditingProduct(product);

                  // 🔥 PARSE DIMENSIONS 
                  const dimensions = product.dimensions || ""; 
                  const [height, width] = dimensions 
                  .replace("cm", "") .split("x") .map((v) => v.trim());

                  setForm({
                    name: product.name || "",
                    price: product.price || "",
                    // 🔥 NEW DIMENSIONS 
                    height: height || "", 
                    width: width || "",
                    description: product.description || "",
                  });

                  setTechnique(product.technique || "");

                  // 🔥 PRELOAD IMAGES
                  setImages(product.images || []);

                  // 🔥 SCROLL TO TOP
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }

  // ================= CANCEL EDIT CLICK =================
    function handleCancelEdit() {

                  // EXIT EDIT MODE
                  setEditingProduct(null);

                  // RESET FORM
                  resetForm();

                  // SUCCESS MESSAGE
                  setSuccessMessage("Edit cancelled");

                  setSuccess(true);

                  setTimeout(() => {
                    setSuccess(false);
                  }, 3000);
                }

  // ================= UPDATE PRODUCT =================
  async function handleUpdateProduct() {

          try {

            setLoading(true);
            setErrorMessage("");
            // ================= VALIDATIONS =================
            setTimeout(() => {
                messageRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }, 100);

            // ================= VALIDATIONS =================
            if (!form.height || !form.width) { setErrorMessage("Debes agregar dimensiones"); return; }
            if (!images.length) { setErrorMessage("Debes agregar imágenes"); return; }

            const mainImage = images.find(
              (img) => img.role === "main"
            );

            if (!mainImage) {
              setErrorMessage("Debes seleccionar MAIN image");
              return;
            }

            let uploadedImages = [];

            // ================= PROCESS IMAGES =================
            for (let img of images) {

              // 🔥 EXISTING IMAGE
              if (!img.file) {

                uploadedImages.push({
                  url: img.url,
                  role: img.role,
                });

                continue;
              }

              // 🔥 NEW IMAGE
              const fileName = `${Date.now()}-${img.file.name}`;

              const { error: uploadError } = await supabase.storage
                .from("products")
                .upload(fileName, img.file);

              if (uploadError) {
                setErrorMessage(uploadError.message);
                return;
              }

              const { data } = supabase.storage
                .from("products")
                .getPublicUrl(fileName);

              uploadedImages.push({
                url: data.publicUrl,
                role: img.role,
              });
            }

            // ================= UPDATE DB =================
            const { error } = await updateProduct(
              editingProduct.id,
              {
                name: form.name, description: form.description,
                slug: form.name
                  .toLowerCase()
                  .trim()
                  .replace(/\s+/g, "-"),
                price: Number( String(form.price) .replace(/\./g, "") .replace(/,/g, "") ),
                // 🔥 NEW DIMENSIONS SYSTEM 
                dimensions: `${form.height} x ${form.width} cm`,
                images: uploadedImages,
                technique,
              }
            );

            if (error) {
              setErrorMessage(error.message);
              setTimeout(() => {
                messageRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }, 100);
              return;
            }

            // ================= RESET =================
            resetForm();

            // ================= SUCCESS =================
            setSuccessMessage("Product updated successfully");

            setSuccess(true);

            setTimeout(() => {
              setSuccess(false);
              setSuccessMessage("");
            }, 3000);

            // ================= RELOAD =================
            loadProducts();

          } catch (err) {

            console.log(err);

            setErrorMessage(
              err.message || "Unexpected error"
            );

          } finally {

            setLoading(false);

          }
        }

        // ================= CHECK ORDER HISTORY =================
async function hasOrderHistory(productId) {

  const { count, error } = await supabase
    .from("order_items")
    .select("*", {
      head: true,
      count: "exact",
    })
    .eq("product_id", productId);

  if (error) {
    console.error(error);
    return false;
  }

  return count > 0;
}

  // ================= CONFIRM DELETE =================
  async function confirmDelete(product) {

        // Verificar si tiene historial de pedidos
        const hasHistory = await hasOrderHistory(product.id);
        if (hasHistory) {
          await Swal.fire({
            title: "No se puede eliminar",
            html: `
              <div style="text-align:left; line-height:1.6">
                <p>
                  Este producto forma parte del
                  <strong>historial de pedidos</strong>.
                </p>
                <br>
                <p>
                  Para conservar la integridad de las ventas,
                  este producto no puede eliminarse.
                </p>
                <br>
                <p style="color:#9ca3af">
                  Próximamente podrás
                  <strong>archivarlo</strong>
                  para ocultarlo de la tienda sin perder
                  el historial.
                </p>
              </div>
            `,
            icon: "info",
            background: "#1f2937",
            color: "#fff",
            confirmButtonColor: "#055651",
            confirmButtonText: "Entendido",
          });
          return;
        }
        // ----------------------------
        // Flujo normal
        // ----------------------------


            const result = await Swal.fire({
              title: "Delete Product?",
              text: `"${product.name}" will be permanently deleted.`,
              icon: "warning",

              background: "#1f2937",
              color: "#fff",

              showCancelButton: true,

              confirmButtonColor: "#dc2626",
              cancelButtonColor: "#374151",

              confirmButtonText: "Yes, delete it",
              cancelButtonText: "Cancel",

            });

            if (result.isConfirmed) {

               const deleted = await handleDeleteProduct(product);
               if (!deleted) return;

              Swal.fire({
                title: "Deleted!",
                text: "Product removed successfully.",
                icon: "success",

                background: "#1f2937",
                color: "#fff",

                confirmButtonColor: "#2563eb",
              });
            }
          }

    // ================= GET STORAGE PATH =================
  function getStoragePath(url) {

            if (!url) return "";

            const parts =
              url.split("/storage/v1/object/public/products/");

            // DECODE URL
            return decodeURIComponent(parts[1]);
          }
  // ================= DELETE PRODUCT =================

async function handleDeleteProduct(product) {

  try {

    // ================= GET FILE PATHS =================
    const filePaths = (product.images || []).map(img =>
      getStoragePath(img.url)
    );

    // ================= DELETE STORAGE FILES =================
    if (filePaths.length > 0) {

      const { error: storageError } = await supabase.storage
        .from("products")
        .remove(filePaths);

      if (storageError) {

        console.error(storageError);

        await Swal.fire({
          icon: "error",
          title: "Storage Error",
          text: "No fue posible eliminar las imágenes.",
          background: "#1f2937",
          color: "#fff",
        });

        return false;

      }

    }

    // ================= DELETE DB RECORD =================
    const { error } = await deleteProduct(product.id);

    if (error) {

      // Producto con historial
      if (
        error.message.includes("order_items_product_id_fkey")
      ) {

        await Swal.fire({

          icon: "info",

          title: "No se puede eliminar",

          html: `
            <p>
              Este producto forma parte del
              <strong>historial de pedidos</strong>.
            </p>

            <br>

            <p>
              Puedes archivarlo para ocultarlo
              de la tienda sin perder el historial
              de ventas.
            </p>
          `,

          background: "#1f2937",
          color: "#fff",

          confirmButtonColor: "#055651",

          confirmButtonText: "Entendido",

        });

        return false;

      }

      // Cualquier otro error
      console.error(error);

      await Swal.fire({

        icon: "error",

        title: "Error",

        text: error.message,

        background: "#1f2937",
        color: "#fff",

      });

      return false;

    }

    // ================= RELOAD PRODUCTS =================
    await loadProducts();

    return true;

  }

  catch (err) {

    console.error(err);

    await Swal.fire({

      icon: "error",

      title: "Unexpected Error",

      text: err.message,

      background: "#1f2937",
      color: "#fff",

    });

    return false;

  }

}
  // ================= FORMAT PRICE =================
  function formatPrice(value, currency) {

            const numbers = value.replace(/\D/g, "");

            if (!numbers) return "";

            return new Intl.NumberFormat(
              currency === "COP" ? "es-CO" : "en-US"
            ).format(numbers);
          }

  // ================= HANDLE PRICE CHANGE =================
  function handlePriceChange(e) {

              const rawValue = e.target.value;

              const formattedValue =
                formatPrice(rawValue, currency);

              setForm({
                ...form,
                price: formattedValue,
              });
            }

  // ================= REMOVE IMAGE =================
  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }
  return (
    <AdminLayout>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Productos
          </h1>

          <p className="text-gray-400 mt-1">
            Manage your products
          </p>
        </div>

      </div>

      <ProductForm
          form={form}
          handleChange={handleChange}
          handlePriceChange={handlePriceChange}

          currency={currency}
          setCurrency={setCurrency}

          images={images}
          setImages={setImages}   // 👈 ESTA FALTABA

          handleImageChange={handleImageChange}
          setImageRole={setImageRole}
          removeImage={removeImage}

          editingProduct={editingProduct}
          handleCancelEdit={handleCancelEdit}

          technique={technique}
          setTechnique={setTechnique}

          loading={loading}
          
          handleCreateProduct={handleCreateProduct}
          handleUpdateProduct={handleUpdateProduct}

          inputKey={inputKey}
          imageInputRef={imageInputRef}

          optimizationSummary={optimizationSummary}
          showOptimizationDetails={showOptimizationDetails}
          setShowOptimizationDetails={setShowOptimizationDetails}
          // formatBytes={formatBytes}
        />

      <ProductList
        products={products}
        handleEditClick={handleEditClick}
        confirmDelete={confirmDelete}
      />

      <ProductMessages
        success={success}
        successMessage={successMessage}
        errorMessage={errorMessage}
        messageRef={messageRef}
      />

    </AdminLayout>
  );
}