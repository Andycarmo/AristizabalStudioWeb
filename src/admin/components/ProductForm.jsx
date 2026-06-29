export default function ProductForm({
  form,
  handleChange,
  handlePriceChange,

  currency,
  setCurrency,

  images = [],
  setImages,

  inputKey,

  editingProduct,
  handleCancelEdit,

  technique,
  setTechnique,

  loading,

  handleImageChange,
  setImageRole,
  removeImage,

  handleCreateProduct,
  handleUpdateProduct,

    imageInputRef, // 👈 🔥 ESTO FALTABA
}) {

  return (
    <div className="bg-gray-800 p-6 rounded-2xl mb-8">

      {/* EDIT MODE */}
      {editingProduct && (
        <div className="mb-6 bg-yellow-500/20 border border-yellow-500 text-yellow-300 px-4 py-3 rounded-xl flex justify-between items-center">
          <div>
            ✏️ Editing Product:
            <span className="font-semibold ml-2">
              {editingProduct.name}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCancelEdit}
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-semibold hover:bg-yellow-400"
          >
            Cancel
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-6">
        {editingProduct ? "Edit Product" : "Create Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ================= NAME ================= */}
        <input
          type="text"
          name="name"
          placeholder="Nombre del Producto"
          value={form.name}
          onChange={handleChange}
          className="bg-gray-900 p-3 rounded-xl"
        />

        {/* ================= PRICE ================= */}
        <div className="flex gap-3">

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-gray-900 p-3 rounded-xl"
          >
            <option value="COP">COP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>

          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handlePriceChange}
            className="flex-1 bg-gray-900 p-3 rounded-xl"
          />
        </div>
{/* ================= Section Dimensions - Tecnique  ================= */}
      {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-4">*/}

{/* ================= PRODUCT TYPE  ================= */}
      <div className="flex flex-col gap-1">

        <label>Product Type</label>

        <select
          name="product_type"
          value={form.product_type || ""}
          onChange={handleChange}
          className="bg-gray-900 p-3 rounded-xl"
        >

          <option value="artwork">
            Artworks
          </option>

          <option value="print">
            Prints
          </option>

          <option value="book">
            Books
          </option>

          <option value="brush">
            Pinceles
          </option>

          <option value="kit">
            Kit Soporte
          </option>

          <option value="accessory">
            Accessory
          </option>

        </select>

      </div>

 {/* ================= SKU ================= */}
<div className="flex flex-col gap-1">

  <label>SKU</label>

  <input
    type="text"
    name="sku"
    placeholder="ART-001"
    value={form.sku || ""}
    onChange={handleChange}
    className="bg-gray-900 p-3 rounded-xl"
  />

</div>
            {/* ================= DIMENSIONS ================= */}
            
            <div className="flex flex-col gap-1">
          <label>Dimensions</label>
            <div className="
              bg-gray-900
              p-4
              rounded-2xl
              border
              border-gray-700
            ">

             {/* <p className="text-sm font-semibold mb-3">
                Dimensions
              </p>*/}

              <div className="flex items-end gap-3">

                {/* HEIGHT */}
                <div className="flex-1">
                  <label className="text-xs text-gray-400 mb-1 block">
                    Height
                  </label>

                  <input
                    type="number"
                    name="height"
                    placeholder="80"
                    value={form.height || ""}
                    onChange={handleChange}
                    className="
                      w-full
                      bg-gray-800
                      p-3
                      rounded-xl
                    "
                  />
                </div>

                {/* X */}
                <div className="pb-3 text-gray-400 font-bold">
                  X
                </div>

                {/* WIDTH */}
                <div className="flex-1">
                  <label className="text-xs text-gray-400 mb-1 block">
                    Width
                  </label>

                  <input
                    type="number"
                    name="width"
                    placeholder="120"
                    value={form.width || ""}
                    onChange={handleChange}
                    className="
                      w-full
                      bg-gray-800
                      p-3
                      rounded-xl
                    "
                  />
                </div>

                {/* UNIT */}
                <div className="
                  pb-3
                  text-sm
                  text-gray-400
                  min-w-[30px]
                ">
                  cm
                </div>

              </div>

           </div>
          </div>

  {/* ================= TECHNIQUE ================= */}
  
        <div className="flex flex-col gap-1">
          <label>Técnica Usada</label>
          <select
            value={technique}
            onChange={(e) => setTechnique(e.target.value)}
            className="bg-gray-900 p-3 rounded-xl"
          >
            <option value="">Select</option>
            <option value="Oil Painting">Oleo</option>
            <option value="Acrylic">Acuarela</option>
            <option value="Print">Digital</option>
          </select>
        </div>

{/*</div>*/}
  {/* ================= IMAGES ================= */}
        <div className="md:col-span-2 bg-gray-900 p-4 rounded-2xl border border-gray-700">

          <h3 className="font-semibold mb-2">Images</h3>

          <input
            key={inputKey}
            ref={imageInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 bg-gray-800 rounded-xl"
          />

          {/* PREVIEW GRID */}
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-3">
              Seleccionadas: {images.length}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative group rounded-xl overflow-hidden border border-gray-700"
                >

                  {/* IMAGE */}
                  <img
                    src={img.preview || img.url}
                    alt=""
                    className="w-full h-28 object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.webp";
                    }}
                  />

                  {/* BADGES */}
                  {img.role === "main" && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-md font-bold">
                      MAIN
                    </div>
                  )}

                  {img.role === "hover" && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md font-bold">
                      HOVER
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-2 transition">

                    <button
                      type="button"
                      onClick={() => setImageRole(index, "main")}
                      className="bg-yellow-500 text-black px-3 py-1 rounded-md text-xs"
                    >
                      Set MAIN
                    </button>

                    <button
                      type="button"
                      onClick={() => setImageRole(index, "hover")}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Set HOVER
                    </button>

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))}

            </div>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          placeholder="Descripción"
          className="md:col-span-2 bg-gray-900 p-3 rounded-xl"
        />

      </div>

      {/* ================= BUTTON ================= */}
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
        px-6 
        py-3 
        rounded-xl"
      >
        {loading
          ? "Saving..."
          : editingProduct
            ? "Update Product"
            : "Create Product"}
      </button>

      

    </div>
  );
}