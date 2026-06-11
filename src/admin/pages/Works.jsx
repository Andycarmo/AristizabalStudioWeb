import { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import AdminLayout from "../layouts/AdminLayout";
import Swal from "sweetalert2";
import {
  Trash2,
} from "lucide-react";

export default function Works() {

  // ================= STATE =================

  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [inputKey, setInputKey] = useState(Date.now());
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [works, setWorks] = useState([]);

  // ================= HANDLE IMAGE CHANGE =================

  function handleImageChange(e) {

      const files = [...e.target.files];

      setImages(files);

      // PREVIEW
      if (files.length > 0) {

        const imageUrl = URL.createObjectURL(files[0]);

        setPreview(imageUrl);

      }

    }

  // ================= UPLOAD IMAGES =================

  async function uploadImages() {

    const uploadedImages = [];

    for (const image of images) {

      const fileName = `${Date.now()}-${image.name}`;

      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, image);

      if (error) {

        console.error(error);

        continue;

      }

      // GET PUBLIC URL
      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      uploadedImages.push(data.publicUrl);

    }

    return uploadedImages;

  }

  // ================= HANDLE SUBMIT =================

  async function handleSubmit(e) {

    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {

      setLoading(true);

      // UPLOAD IMAGES
      const uploadedImages = await uploadImages();

      // CREATE SLUG
      const slug = name
        .toLowerCase()
        .replaceAll(" ", "-");

      // INSERT DATABASE
      const { error } = await supabase
        .from("products")
        .insert([
          {
            name,
            slug,
            images: uploadedImages,
            type: "recent_work",
          },
        ]);

      if (error) throw error;

      await loadWorks();

      setSuccess(true);
      setSuccessMessage("Recent Work saved successfully");
      setTimeout(() => {
      setSuccess(false);
      setSuccessMessage("");
    }, 3000);

      // RESET 
      resetForm();

    } catch (error) {

      console.error(error);

      setSuccess(false);
      setErrorMessage("Error creating recent work");
      setTimeout(() => {
      setSuccess(false);
      setSuccessMessage("");
    }, 3000);

    } finally {

      setLoading(false);

    }

  }


// ================= LOAD WORKS  =================
useEffect(() => {
  loadWorks();
}, []);

async function loadWorks() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("type", "recent_work")
    .order("created_at", { ascending: false });

  if (!error) {
    setWorks(data || []);
  }
}

// ================= GET STORAGE PATH =================
function getStoragePath(url) {
  if (!url) return "";

  const parts =
    url.split("/storage/v1/object/public/products/");

  return decodeURIComponent(parts[1]);
}

  // ================= RESET CAMPOS  =================
  function resetForm() {

  setName("");

  setImages([]);

  setPreview(null);

  setInputKey(Date.now());

}

// ================= CONFIRM DELETE =================
async function confirmDelete(work) {
  const result = await Swal.fire({
    title: "Delete Work?",
    text: `"${work.name}" will be permanently deleted.`,
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
    await handleDeleteWork(work);

    Swal.fire({
      title: "Deleted!",
      text: "Work removed successfully.",
      icon: "success",

      background: "#1f2937",
      color: "#fff",

      confirmButtonColor: "#2563eb",
    });
  }
}

// ================= DELETE WORK =================
async function handleDeleteWork(work) {
  try {

    // ================= GET FILE PATHS =================
    const filePaths =
      work.images?.map((img) =>
        getStoragePath(img)
      ) || [];

    // ================= DELETE STORAGE FILES =================
    const { error: storageError } =
      await supabase.storage
        .from("products")
        .remove(filePaths);

    if (storageError) {
      console.log(storageError);
      return;
    }

    // ================= DELETE DB RECORD =================
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", work.id);

    if (error) {
      console.log(error);
      return;
    }

    // ================= RELOAD WORKS =================
    loadWorks();

  } catch (err) {
    console.log(err);
  }
}

  // ================= UI =================

  return (

    <AdminLayout>

      {/* HEADER */}
    <div className="flex justify-between items-center mb-8">
    

      {/* TITLE */}
      <div>

        <h1 className="text-3xl font-bold text-white">
          Recent Works
        </h1>

        <p className="text-gray-400 mt-1">
          Upload portfolio projects and gallery works.
        </p>

      </div>
    </div>

      <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-6
            mb-8
          "
        >

          {/* LEFT SIDE */}
          <div
            className="
              lg:col-span-2
              bg-gray-800
              p-6
              rounded-2xl
            "
          >

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* NAME */}
              <div>

                <h3 className="font-semibold mb-2">
                  Work Name
                </h3>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Modern Kitchen"
                  required
                  className="
                    w-full
                    bg-gray-900
                    p-3
                    rounded-xl
                    text-white
                    placeholder-gray-500
                    outline-none
                    focus:ring-2
                    focus:ring-blue-600
                  "
                />

              </div>

              {/* IMAGES */}
              <div className="
                bg-gray-900
                p-4
                rounded-2xl
                border
                border-gray-700
              ">

                <h3 className="font-semibold mb-2">
                  Upload Image
                </h3>

                <input
                  key={inputKey}
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="
                    w-full
                    p-2
                    bg-gray-800
                    rounded-xl
                  "
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="
                  mt-6
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  transition-all
                  duration-200
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Uploading..."
                  : "Create Work"}
              </button>

            </form>

          </div>

          {/* RIGHT SIDE */}
          <div
            className="
              bg-gray-800
              p-6
              rounded-2xl
            "
          >

            <h3 className="
              font-semibold
              mb-4
            ">
              Image Preview
            </h3>

            <div
              className="
                aspect-square
                rounded-2xl
                overflow-hidden
                bg-gray-900
                border
                border-gray-700
                flex
                items-center
                justify-center
              "
            >

              {preview ? (

                <img
                  src={preview}
                  alt="Preview"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              ) : (

                <p className="text-gray-500 text-sm">
                  No image selected
                </p>

              )}

            </div>

          </div>

        </div>

        {/* SUCCESS MESSAGE */}
        {successMessage && (

          <div
            className="
              mt-6
              bg-green-500/20
              border
              border-green-500
              text-green-300
              px-4
              py-3
              rounded-xl
            "
          >
            {successMessage}
          </div>

        )}

        {/* ERROR MESSAGE */}
        {errorMessage && (

          <div
            className="
              mt-6
              bg-red-500/20
              border
              border-red-500
              text-red-300
              px-4
              py-3
              rounded-xl
            "
          >
            {errorMessage}
          </div>

        )}

        {/* RECENT WORKS GALLERY */}
        <div
          className="
            mt-10
            bg-gray-800
            rounded-2xl
            p-6
          "
        >
          <h2 className="text-2xl font-bold mb-6 text-white">
            Saved Recent Works
          </h2>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-6
            "
          >
            {works.map((work) => (
              <div
                key={work.id}
                className="
                  bg-gray-900
                  rounded-2xl
                  overflow-hidden
                  border
                  border-gray-700
                  flex
                  flex-col
                "
              >
                <img
                  src={work.images?.[0]}
                  alt={work.name}
                  className="
                    w-full
                    p-3
                    h-64
                    object-contain
                  "
                />

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="
                  bg-gray-800
                  text-center
                  rounded-xl
                  font-semibold text-white">
                    {work.name}
                  </h3>

                {/* BUTTON */}
                <div className="mt-auto pt-4">
                  {/* DELETE */}
                      <button
                        onClick={() => confirmDelete(work)}
                        className="
                          w-full
                          flex
                          items-center
                          gap-2
                          px-4
                          py-2
                          border
                          border-red-500
                          text-red-400
                          rounded-xl
                          hover:bg-red-500
                          hover:text-white
                          transition
                          
                        "
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </AdminLayout>

  );

}