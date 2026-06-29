import { useEffect, useState, useRef } from "react";
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
function handleImageChange(e) {
  const files = Array.from(e.target.files);

  const newImages = files.map(file => ({
    file,
    role: "gallery", // default
    preview: URL.createObjectURL(file),
  }));

  setImages(prev => [...prev, ...newImages]);
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
                  const fileName = `${Date.now()}-${img.file.name}`;

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


  // ================= CONFIRM DELETE =================
  async function confirmDelete(product) {

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

              await handleDeleteProduct(product);

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
          const filePaths = product.images.map((img) =>
            getStoragePath(img.url)
          )|| [];;

          // ================= DELETE STORAGE FILES =================
          const { error: storageError } = await supabase.storage
            .from("products")
            .remove(filePaths);

          if (storageError) {
            console.log(storageError);
            return;
          }

          // ================= DELETE DB RECORD =================
          const { error } = await deleteProduct(product.id);

          if (error) {
            console.log(error);
            return;
          }

          // ================= RELOAD PRODUCTS =================
          loadProducts();

        } catch (err) {
          console.log(err);
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

  // ================= HANDLE IMAGE CHANGE =================
  function handleImageChange(e) {
        const files = Array.from(e.target.files);

        const newImages = files.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          role: "gallery", // default
        }));

        setImages((prev) => [...prev, ...newImages]);
      }

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