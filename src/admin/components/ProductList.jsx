import {
  Pencil,
  Trash2,
} from "lucide-react";

export default function ProductList({
  products,
  handleEditClick,
  confirmDelete,
}) {

  return (

    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-5
        gap-4
      "
    >

      {products.map((product) => {

        // MAIN IMAGE
        const mainImage = product.images?.find(
          (img) => img.role === "main"
        );

        // HOVER IMAGE
        const hoverImage = product.images?.find(
          (img) => img.role === "hover"
        );

        return (

          <div
            key={product.id}
            className="flex justify-center"
          >

            <div
              className="
                bg-gray-800
                rounded-2xl
                overflow-hidden
                border
                border-gray-700
                max-w-[260px]
                w-full
              "
            >

              {/* IMAGE */}
              <img
                src={
                  mainImage?.url ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                alt={product.name}
                className="
                  w-full
                  h-44
                  object-cover
                "
              />

              {/* HOVER PREVIEW */}
              {hoverImage && (

                <div className="px-4 pt-3">

                  <div className="flex items-center gap-3">

                    <img
                      src={hoverImage.url}
                      alt="Hover Preview"
                      className="
                        w-14
                        h-14
                        object-cover
                        rounded-lg
                        border
                        border-gray-700
                      "
                    />

                    <div className="flex flex-col">

                      <span className="text-sm text-gray-400">
                        Hover Image
                      </span>

                      <span className="text-xs text-gray-500">
                        Secondary Preview
                      </span>

                    </div>

                  </div>

                </div>
              )}

              {/* CONTENT */}
              <div className="p-4">

                <div className="flex gap-4 justify-between">

                  {/* LEFT */}
                  <div className="flex-1 min-w-0">

                    <h2 className="text-base font-semibold truncate">
                      {product.name}
                    </h2>

                    <p className="text-gray-400 mt-1 text-sm line-clamp-2">
                      {product.description}
                    </p>

                    <p className="mt-3 text-sm font-bold">
                      ${product.price}
                    </p>

                    {/* BUTTONS */}
                    <div className="flex gap-3 mt-5">

                      {/* EDIT */}
                      <button
                        onClick={() => handleEditClick(product)}
                        className="
                          flex-1
                          flex
                          items-center
                          justify-center
                          gap-2
                          border
                          border-blue-500
                          text-blue-400
                          py-2
                          rounded-xl
                          hover:bg-blue-500
                          hover:text-white
                          transition
                          duration-200
                        "
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => confirmDelete(product)}
                        className="
                          flex-1
                          flex
                          items-center
                          justify-center
                          gap-2
                          border
                          border-red-500
                          text-red-400
                          py-2
                          rounded-xl
                          hover:bg-red-500
                          hover:text-white
                          transition
                          duration-200
                        "
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );
}