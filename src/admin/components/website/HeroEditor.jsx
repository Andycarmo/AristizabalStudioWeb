import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import {getSection, updateSection,}from "../../../services/websiteService";
import CollapsibleSection from "./CollapsibleSection";
import WebsiteImageUploader from "./WebsiteImageUploader";
import Swal from "sweetalert2";

export default function HeroEditor({
    open,
    onToggle,
}) {

const [title,setTitle]=useState("");
const [loading,setLoading]=useState(false);
const [form, setForm] = useState({
  intro_text: "",
  highlight_1: "",
  middle_text: "",
  highlight_2: "",
  ending_text: "",
});
const [selectedImage, setSelectedImage] = useState(null);
const [previewImage, setPreviewImage] = useState(form.background_image || "/Cuadro-Hero.webp");
const [optimization, setOptimization] = useState(null);
const [heroImage, setHeroImage] = useState(null);


useEffect(()=>{
loadHero();
},[]);
async function loadHero() {

  try {

    const hero = await getSection("hero");

        setForm({

      intro_text: hero.intro_text || "",

      highlight_1: hero.highlight_1 || "",

      middle_text: hero.middle_text || "",

      highlight_2: hero.highlight_2 || "",

      ending_text: hero.ending_text || "",

    });

  }

  catch (err) {

    console.error(err);

  }

}

async function saveHero() {
    try {
        setLoading(true);
        await updateSection("hero", form);
        await loadHero();
        Swal.fire({
            icon: "success",
            title: "Hero Updated",
            text: "The Hero section was updated successfully.",
            timer: 2500,
            showConfirmButton: false,
            background: "#1f2937",
            color: "#fff",
            });

    }

    catch (err) {
        console.error(err);
            Swal.fire({
            icon:"error",
            title:"Error",
            text:err.message,
            background:"#1f2937",
            color:"#fff",
            });
    }
    finally {
        setLoading(false);
    }

    }

function handleChange(e) {

  const { name, value } = e.target;

  setForm(prev => ({

    ...prev,

    [name]: value,

  }));

}

    return (
        <CollapsibleSection
            title="Hero"
            subtitle="Homepage Banner"
            icon={Image}
            open={open}
            onToggle={onToggle}
        >
            <div
                className="
                    grid
                    lg:grid-cols-2
                    gap-8
                "
            >
                {/* CONTENT */}

                <div
                className="
                    bg-[#111827]
                    border
                    border-gray-700
                    rounded-2xl
                    p-8
                "
                >

                <h3
                    className="
                    text-lg
                    font-semibold
                    text-white
                    "
                >

                    Content

                </h3>

                <p
                    className="
                    text-sm
                    text-gray-400
                    mt-1
                    mb-4
                    "
                >

                    Edit your homepage Hero section.

                </p>

                <div className="space-y-3">

                    {/* INTRO */}

                    <div>

                    <label className="block text-sm text-gray-300 mb-2">

                        Intro Text

                    </label>

                    <input

                        name="intro_text"

                        value={form.intro_text}

                        onChange={handleChange}

                        className="
                        w-full
                        bg-gray-800
                        border
                        border-gray-700
                        rounded-xl
                        px-4
                        py-2.5
                        text-white
                        "

                    />

                    </div>

                    {/* ORANGE */}

                    <div>

                    <label className="block text-sm text-orange-400 mb-2">

                        Highlight 1

                    </label>

                    <input

                        name="highlight_1"

                        value={form.highlight_1}

                        onChange={handleChange}

                        className="
                        w-full
                        bg-gray-800
                        border
                        border-orange-500
                        rounded-xl
                        px-4
                        py-2.5
                        text-white
                        "

                    />

                    </div>

                    {/* MIDDLE */}

                    <div>

                    <label className="block text-sm text-gray-300 mb-2">

                        Middle Text

                    </label>

                    <textarea

                        rows={2}

                        name="middle_text"

                        value={form.middle_text}

                        onChange={handleChange}

                        className="
                        w-full
                        bg-gray-800
                        border
                        border-gray-700
                        rounded-xl
                        px-4
                        py-2.5
                        text-white
                        "

                    />

                    </div>

                    {/* PINK */}

                    <div>

                    <label className="block text-sm text-pink-400 mb-2">

                        Highlight 2

                    </label>

                    <input

                        name="highlight_2"

                        value={form.highlight_2}

                        onChange={handleChange}

                        className="
                        w-full
                        bg-gray-800
                        border
                        border-pink-500
                        rounded-xl
                        px-4
                        py-2.5
                        text-white
                        "

                    />

                    </div>

                    {/* END */}

                    <div>

                    <label className="block text-sm text-gray-300 mb-2">

                        Ending Text

                    </label>

                    <textarea

                        rows={2}

                        name="ending_text"

                        value={form.ending_text}

                        onChange={handleChange}

                        className="
                        w-full
                        bg-gray-800
                        border
                        border-gray-700
                        rounded-xl
                        px-4
                        py-2.5
                        text-white
                        "

                    />

                    </div>

                    <button

                    onClick={saveHero}

                    className="
                        w-full
                        bg-studio-green
                        hover:opacity-90
                        transition
                        text-white
                        py-2.5
                        rounded-xl
                        font-medium
                    "

                    >

                    {

                        loading

                        ? "Saving..."

                        : "Save Hero"

                    }

                    </button>

                </div>

                </div>

               {/* PREVIEW */}
                    <div
                    className="
                        bg-[#111827]
                        border
                        border-gray-700
                        rounded-2xl
                        p-6
                    "
                    >

                    <div className="flex flex-col gap-6">

                        {/* Preview */}
                        <div
                        className="
                            relative
                            w-full
                            aspect-[16/9]
                            rounded-2xl
                            overflow-hidden
                            shadow-lg
                        "
                        >
                        <img
                            src={form.background_image || "/Cuadro-Hero.webp"}
                            alt="Hero Preview"
                            className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                            "
                        />

                        <div
                            className="
                            absolute
                            inset-0
                            bg-black/40
                            "
                        />

                        <div
                            className="
                            absolute
                            inset-0
                            z-10
                            flex
                            items-end
                            p-6
                            "
                        >
                            <h2
                            className="
                                text-white
                                text-2xl
                                font-cocomat
                                leading-tight
                            "
                            >
                            {form.intro_text}{" "}
                            <span className="block-orange">
                                {form.highlight_1}
                            </span>{" "}
                            {form.middle_text}{" "}
                            <span className="block-fucsia">
                                {form.highlight_2}
                            </span>{" "}
                            {form.ending_text}
                            </h2>
                        </div>
                        </div>

                        {/* Uploader */}
                        <WebsiteImageUploader
                        label="Hero Background"
                        value={form.background_image}
                        ratio={16 / 9}
                        minWidth={1600}
                        minHeight={900}
                        onChange={({ file, preview }) => {
                            setHeroImage(file);

                            setForm(prev => ({
                            ...prev,
                            background_image: preview,
                            }));
                        }}
                        />
                    </div>
                    </div>
            </div>
        </CollapsibleSection>
    );
}