import { useEffect, useState, useRef } from "react";
import AdminLayout from "../layouts/AdminLayout";
import ProductMessages from "../components/ProductMessages";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { supabase } from "../../config/supabase";
import Swal from "sweetalert2";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/products";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState("COP");
  const [imageFile, setImageFile] = useState(null);
  const [hoverImageFile, setHoverImageFile] = useState(null);
  const [technique, setTechnique] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    dimensions: "",
    description: "",
  });

  // ================= STATES =================
const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const [editingProduct, setEditingProduct] = useState(null);
const [successMessage, setSuccessMessage] = useState("");

  // ================= REFS =================
const imageInputRef = useRef(null);
const hoverInputRef = useRef(null);

  // ================= LOAD PRODUCTS =================
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

  // ================= HANDLE INPUT =================
  function handleChange(e) {

            setForm({
              ...form,
              [e.target.name]: e.target.value,
            });
          }

    // ================= CLEAN FORM =================
  function resetForm() {

            setForm({
              name: "",
              price: "",
              dimensions: "",
              description: "",
            });

            setImageFile(null);
            setHoverImageFile(null);
            setEditingProduct(null);
            setTechnique("");

            // CLEAN FILE INPUTS
            if (imageInputRef.current) {
              imageInputRef.current.value = "";
            }

            if (hoverInputRef.current) {
              hoverInputRef.current.value = "";
            }
          }

  // ================= CREATE PRODUCT =================
  async function handleCreateProduct() {
            try {

                setLoading(true);
                setErrorMessage("");

              let imageUrl = "";
              let hoverImageUrl = "";

              let fileName = "";
              let hoverFileName = "";
              
              // ================= UPLOAD MAIN IMAGE =================
              if (imageFile) {

              fileName = `${Date.now()}-${imageFile.name}`;

              const { error: uploadError } = await supabase.storage
                .from("products")
                .upload(fileName, imageFile);

              if (uploadError) {
                setErrorMessage(uploadError.message);
                return;
              }

              const { data } = supabase.storage
                .from("products")
                .getPublicUrl(fileName);

              imageUrl = data.publicUrl;
            }

            // ================= UPLOAD HOVER IMAGE =================
            if (hoverImageFile) {

              hoverFileName = `${Date.now()}-${hoverImageFile.name}`;

              const { error: hoverUploadError } = await supabase.storage
                  .from("products")
                  .upload(hoverFileName, hoverImageFile);

              if (hoverUploadError) {
                setErrorMessage(hoverUploadError.message);
                return;
              }

              const { data: hoverData } = supabase.storage
                .from("products")
                .getPublicUrl(hoverFileName);

              hoverImageUrl = hoverData.publicUrl;
            }

              // ================= CREATE PRODUCT =================
              const { error } = await createProduct({
                ...form,
                slug: form.name
                  .toLowerCase()
                  .trim()
                  .replace(/\s+/g, "-"),
                price: Number(String(form.price).replace(/\./g, "").replace(/,/g, "")),
                image_url: imageUrl,
                hover_image_url: hoverImageUrl,
                technique: technique, // 👈 AQUÍ
              });
              console.log(error);

              if (error) {
                console.log(error);
                setErrorMessage("Error creating product");
                setLoading(false);
                return;
              }

              // ================= SUCCESS =================
                setSuccessMessage("Product created successfully");
                setSuccess(true);

                setTimeout(() => {
                  setSuccess(false);
                }, 3000);

              // ================= RESET =================
              resetForm();

              // ================= RELOAD =================
              loadProducts();

            } catch (err) {

              console.log(err);

              setErrorMessage("Unexpected error");

            } finally {

              setLoading(false);
            }
          }

  // ================= EDIT CLICK =================
      function handleEditClick(product) {

                  setEditingProduct(product);

                  setForm({
                    name: product.name || "",
                    price: product.price || "",
                    dimensions: product.dimensions || "",
                    description: product.description || "",
                  });

                  setTechnique(product.technique || "");

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

  // ================= REMOVE CURRENT IMAGE =================
  async function handleRemoveCurrentImage() {

            try {

              // DELETE FROM STORAGE
              if (editingProduct.image_url) {

                const oldImagePath =
                  getStoragePath(editingProduct.image_url);

                await supabase.storage
                  .from("products")
                  .remove([oldImagePath]);
              }

              // UPDATE DATABASE
              const { error } = await updateProduct(
                editingProduct.id,
                {
                  image_url: null,
                }
              );

              if (error) {
                console.log(error);
                return;
              }

              // UPDATE UI
              setEditingProduct({
                ...editingProduct,
                image_url: null,
              });

            } catch (error) {

              console.log(error);

            }
          }

  // ================= REMOVE CURRENT HOVER IMAGE =================
    async function handleRemoveCurrentHoverImage() {

              try {

                // DELETE FROM STORAGE
                if (editingProduct.hover_image_url) {

                  const oldHoverPath =
                    getStoragePath(
                      editingProduct.hover_image_url
                    );

                  await supabase.storage
                    .from("products")
                    .remove([oldHoverPath]);
                }

                // UPDATE DATABASE
                const { error } = await updateProduct(
                  editingProduct.id,
                  {
                    hover_image_url: null,
                  }
                );

                if (error) {
                  console.log(error);
                  return;
                }

                // UPDATE UI
                setEditingProduct({
                  ...editingProduct,
                  hover_image_url: null,
                });

              } catch (error) {

                console.log(error);

              }
            }

  // ================= UPDATE PRODUCT =================
  async function handleUpdateProduct() {

            try {

              setLoading(true);
              setErrorMessage("");

              let imageUrl = editingProduct.image_url;
              let hoverImageUrl = editingProduct.hover_image_url;

          // ================= NEW IMAGE =================
          if (imageFile) {

                      // DELETE OLD IMAGE
              if (editingProduct.image_url) {

                const oldImagePath =
                  getStoragePath(editingProduct.image_url);

                await supabase.storage
                  .from("products")
                  .remove([oldImagePath]);
              }

            const fileName = `${Date.now()}-${imageFile.name}`;

            const { error: uploadError } = await supabase.storage
              .from("products")
              .upload(fileName, imageFile);

            if (uploadError) {
              setErrorMessage(uploadError.message);
              return;
            }

            const { data } = supabase.storage
              .from("products")
              .getPublicUrl(fileName);

            imageUrl = data.publicUrl;
          }

          // ================= NEW HOVER IMAGE =================
          if (hoverImageFile) {

            // DELETE OLD HOVER IMAGE
          if (editingProduct.hover_image_url) {

            const oldHoverPath =
              getStoragePath(editingProduct.hover_image_url);

            await supabase.storage
              .from("products")
              .remove([oldHoverPath]);
          }

            const hoverFileName =
              `${Date.now()}-${hoverImageFile.name}`;

            const { error: hoverUploadError } =
              await supabase.storage
                .from("products")
                .upload(hoverFileName, hoverImageFile);

            if (hoverUploadError) {
              setErrorMessage(hoverUploadError.message);
              return;
            }

            const { data: hoverData } =
              supabase.storage
                .from("products")
                .getPublicUrl(hoverFileName);

            hoverImageUrl = hoverData.publicUrl;
          }

          // ================= UPDATE DB =================
          const { error } = await updateProduct(
          editingProduct.id,
          {
            ...form,
            slug: form.name
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-"),
            price: Number(String(form.price).replace(/\./g, "").replace(/,/g, "")),
            image_url: imageUrl,
            hover_image_url: hoverImageUrl,
            technique: technique,
          }
        );

          if (error) {
            setErrorMessage(error.message);
            return;
          }

          // ================= RESET =================
            resetForm();

            setSuccessMessage("Product updated successfully");
            setSuccess(true);

            setTimeout(() => {
              setSuccess(false);
            }, 3000);

            loadProducts();

          } catch (err) {

            console.log("FULL ERROR:", err);
            setErrorMessage(err.message || JSON.stringify(err));
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

          // ================= DELETE MAIN IMAGE =================
          if (product.image_url) {

            const imagePath =
              getStoragePath(product.image_url);

            console.log("FULL IMAGE URL:");
            console.log(product.image_url);

            console.log("IMAGE PATH:");
            console.log(imagePath);

            const { data, error } = await supabase.storage
              .from("products")
              .remove([imagePath]);

            console.log("REMOVE RESULT:");
            console.log(data);
            console.log(error);
          }

          // ================= DELETE HOVER IMAGE =================
          if (product.hover_image_url) {

            const hoverImagePath =
              getStoragePath(product.hover_image_url);

            console.log("FULL HOVER URL:");
            console.log(product.hover_image_url);

            console.log("HOVER PATH:");
            console.log(hoverImagePath);

            const { data, error } = await supabase.storage
              .from("products")
              .remove([hoverImagePath]);

            console.log("REMOVE HOVER RESULT:");
            console.log(data);
            console.log(error);
          }
          // ================= DELETE DB RECORD =================
          const { error } = await deleteProduct(product.id);

          if (error) {
            console.log(error);
            return;
          }

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
  return (
    <AdminLayout>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Products
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

        imageInputRef={imageInputRef}
        hoverInputRef={hoverInputRef}

        setImageFile={setImageFile}
        setHoverImageFile={setHoverImageFile}

        imageFile={imageFile}
        hoverImageFile={hoverImageFile}

        editingProduct={editingProduct}
        handleCancelEdit={handleCancelEdit}

        handleRemoveCurrentImage={handleRemoveCurrentImage}
        handleRemoveCurrentHoverImage={handleRemoveCurrentHoverImage}

        editingProduct={editingProduct}
        
        technique={technique}
        setTechnique={setTechnique}

        loading={loading}

        handleCreateProduct={handleCreateProduct}
        handleUpdateProduct={handleUpdateProduct}
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
      />

    </AdminLayout>
  );
}