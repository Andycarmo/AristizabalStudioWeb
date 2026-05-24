export default function ProductForm({
  form,
  handleChange,
  handlePriceChange,

  currency,
  setCurrency,

  imageInputRef,
  hoverInputRef,

  setImageFile,
  setHoverImageFile,

  imageFile,
  hoverImageFile,

  editingProduct,
  handleCancelEdit,

  handleRemoveCurrentImage,
  handleRemoveCurrentHoverImage,

  technique,
  setTechnique,

  loading,

  handleCreateProduct,
  handleUpdateProduct,
}) {
  return (

    <div className="bg-gray-800 p-6 rounded-2xl mb-8">

        {/* EDIT MODE */}
            {editingProduct && (

              <div
                className="
                  mb-6
                  bg-yellow-500/20
                  border
                  border-yellow-500
                  text-yellow-300
                  px-4
                  py-3
                  rounded-xl

                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >

                {/* LEFT */}
                <div>
                  ✏️ Editing Product:
                  <span className="font-semibold ml-2">
                    {editingProduct.name}
                  </span>
                </div>

                {/* CANCEL BUTTON */}
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="
                    px-4
                    py-2
                    rounded-lg

                    bg-yellow-500
                    text-black

                    text-sm
                    font-semibold

                    hover:bg-yellow-400

                    transition
                  "
                >
                  Cancel
                </button>

              </div>

            )}


          {/* CREATE MODE */}

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
        <div className="flex items-center gap-3">

          {/* CURRENCY SELECT */}
          <div className="relative">

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="
                appearance-none
                bg-gray-900
                border
                border-gray-700
                rounded-xl
                px-4
                py-3
                pr-10
                outline-none
                focus:border-blue-500
                cursor-pointer
              "
            >
              <option value="COP">COP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            {/* TRIANGLE */}
            <span
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
                pointer-events-none
              "
            >
              ▼
            </span>

          </div>

          {/* PRICE INPUT */}
          <input
            type="text"
            name="price"
            placeholder={
              currency === "COP"
                ? "000"
                : "000"
            }
            value={form.price}
            onChange={handlePriceChange}
            className="
              flex-1
              bg-gray-900
              border
              border-gray-700
              rounded-xl
              p-3
              outline-none
              focus:border-blue-500
            "
          />

        </div>

        {/* DIMENSIONS */}
        <div className="relative">

          <input
            type="text"
            name="dimensions"
            placeholder="(example: 80 x 120)"
            value={form.dimensions}
            onChange={handleChange}
            className="
              w-full
              bg-gray-900
              p-3
              pr-14
              rounded-xl
              outline-none
              border
              border-gray-700
              focus:border-blue-500
            "
          />

          {/* UNIT */}
          <span
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              pointer-events-none
              text-sm
            "
          >
            cm
          </span>

        </div>

        {/* IMAGES */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* MAIN IMAGE */}
          <div className="bg-gray-900 p-4 rounded-2xl border border-gray-700">

            <h3 className="text-lg font-semibold mb-1">
              Main Image
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              Visible by default in the gallery
            </p>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="
                w-full
                bg-gray-800
                p-3
                rounded-xl
                outline-none
              "
            />

            {/* PREVIEW */}
            {(imageFile || editingProduct?.image_url) && (
              <img
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : editingProduct.image_url
                }
                alt="Preview"
                className="
                  mt-4
                  w-full
                  h-52
                  object-contain
                  bg-gray-800
                  border border-gray-700
                  rounded-xl
                  p-2
                  border border-gray-700
                "
              />
            )}

            {/* REMOVE CURRENT IMAGE */}
            {editingProduct?.image_url && !imageFile && (

              <button
                type="button"
                onClick={handleRemoveCurrentImage}
                className="
                  mt-4
                  w-full

                  border
                  border-red-500

                  text-red-400

                  py-3
                  rounded-xl

                  hover:bg-red-500
                  hover:text-white

                  transition
                "
              >
                Remove Current Image
              </button>

            )}

          </div>

          {/* HOVER IMAGE */}
          <div className="bg-gray-900 p-4 rounded-2xl border border-gray-700">

            <h3 className="text-lg font-semibold mb-1">
              Hover Image
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              Appears when hovering the artwork
            </p>

            <input
              ref={hoverInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setHoverImageFile(e.target.files[0])}
              className="
                w-full
                bg-gray-800
                p-3
                rounded-xl
                outline-none
              "
            />

            {/* PREVIEW */}
            {(hoverImageFile || editingProduct?.hover_image_url) && (
              <img
                src={
                  hoverImageFile
                    ? URL.createObjectURL(hoverImageFile)
                    : editingProduct.hover_image_url
                }
                alt="Hover Preview"
                className="
                  mt-4
                  w-full
                  h-52
                  object-contain
                  bg-gray-800
                  border border-gray-700
                  rounded-xl
                  p-2
                "
              />
            )}

            {/* REMOVE CURRENT HOVER IMAGE */}
            {editingProduct?.hover_image_url &&
              !hoverImageFile && (

              <button
                type="button"
                onClick={handleRemoveCurrentHoverImage}
                className="
                  mt-4
                  w-full

                  border
                  border-red-500

                  text-red-400

                  py-3
                  rounded-xl

                  hover:bg-red-500
                  hover:text-white

                  transition
                "
              >
                Remove Hover Image
              </button>

            )}

          </div>

        </div>

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

  );
}