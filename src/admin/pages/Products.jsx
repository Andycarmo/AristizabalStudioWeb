import { useEffect, useState, useRef } from "react";
import AdminLayout from "../layouts/AdminLayout";
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
  const [imageFile, setImageFile] = useState(null);
  const [hoverImageFile, setHoverImageFile] = useState(null);
  const [technique, setTechnique] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
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
      price: Number(form.price),
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
        description: product.description || "",
      
      });
      setTechnique(product.technique || "");
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
      price: Number(form.price),
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

      {/* CREATE FORM */}
      <div className="bg-gray-800 p-6 rounded-2xl mb-8">

        <h2 className="text-xl font-semibold mb-6">
          Create Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="bg-gray-900 p-3 rounded-xl outline-none"
          />

          {/* PRICE */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="bg-gray-900 p-3 rounded-xl outline-none"
          />

          {/* IMAGE FILE */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="
            bg-gray-900 
            p-3 
            rounded-xl 
            outline-none 
            md:col-span-2"
          />

          {/* HOVER IMAGE FILE */}
          <input
            ref={hoverInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setHoverImageFile(e.target.files[0])}
            className="bg-gray-900 p-3 rounded-xl outline-none md:col-span-2"
          />

          {/* TECHNIQUE */}
          <div className="flex flex-col gap-1">
            <label>Técnica</label>
            <select
                value={technique}
                onChange={(e) => setTechnique(e.target.value)}
                className="bg-gray-900 p-3 rounded-xl"
              >
                <option value="">Select technique</option>
                <option value="Oil Painting">Oil Painting</option>
                <option value="Acrylic">Acrylic</option>
                <option value="Watercolor">Watercolor</option>
                <option value="Mixed Media">Mixed Media</option>
                <option value="Digital">Digital</option>
              </select>
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="bg-gray-900 p-3 rounded-xl outline-none md:col-span-2"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={
            editingProduct
              ? handleUpdateProduct
              : handleCreateProduct
          }
          disabled={loading}
          className="
          mt-6 
          bg-blue-600 
          hover:bg-blue-700 
          px-6 py-3 
          rounded-xl
          disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : editingProduct
              ? "Update Product"
              : "Create Product"}
        </button>

      </div>

      {/* PRODUCTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-gray-800 rounded-2xl overflow-hidden"
          >

            {/* IMAGE */}
            <img
              src={
                product.image_url ||
                "https://placehold.co/600x400?text=No+Image"
              }
              alt={product.name}
              className="w-full h-60 object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-xl font-semibold">
                {product.name}
              </h2>

              <p className="text-gray-400 mt-2 line-clamp-3">
                {product.description}
              </p>

              <p className="mt-4 text-lg font-bold">
                ${product.price}
              </p>

              <div className="flex gap-4 mt-5">

                {/* EDIT */}
                <button
                  onClick={() => handleEditClick(product)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => confirmDelete(product)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div
          className="
          fixed
          top-6
          right-6
          z-50
          bg-green-500/20
          border border-green-500
          text-green-300
          px-4 py-3
          rounded-xl
          backdrop-blur-md
          shadow-xl
          "
        >
          ✅ {successMessage}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {errorMessage && (
        <div
          className="
          mb-6
          bg-red-500/20
          border border-red-500
          text-red-300
          px-4 py-3
          rounded-xl
          "
        >
          ❌ {errorMessage}
        </div>
      )}

    </AdminLayout>
  );
}