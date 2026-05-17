import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../config/supabase";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleLogin(e) {

    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {

      setError(error.message);
      setLoading(false);

      return;
    }

    setLoading(false);

    navigate("/studio-dashboard");

  }

  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#e9dfd8]
      px-6
      "
    >

      <div
        className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        p-8
        "
      >

        <h1
          className="
          font-cocomat
          text-4xl
          text-studio-green
          text-center
          mb-8
          "
        >
          Studio Admin
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5"
        >

          {/* EMAIL */}
          <div className="flex flex-col gap-2">

            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
              border
              border-black/10
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-studio-green
              transition
              "
            />

          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">

            <label className="text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
              border
              border-black/10
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-studio-green
              transition
              "
            />

          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="
            mt-2
            bg-studio-green
            text-white
            py-3
            rounded-xl
            hover:opacity-90
            transition
            disabled:opacity-50
            "
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}