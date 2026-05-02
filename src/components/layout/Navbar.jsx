import { NavLink } from "react-router-dom";

function Navbar({ isMobile = false, onNavigate }) {

  const linkClass = isMobile
    ? "text-xl text-white"
    : "text-sm md:text-base text-studio-pink";

  return (
    <nav
      className={`flex ${
        isMobile
          ? "flex-col items-center gap-8 font-cocomat"
          : "gap-8"
      }`}
    >
      <NavLink
        to="/"
        end
        onClick={onNavigate}
        className={({ isActive }) =>
          `${linkClass} transition ${
            isActive
              ? "text-white border-b border-white"
              : "hover:text-white"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/works"
        onClick={onNavigate}
        className={({ isActive }) =>
          `${linkClass} transition ${
            isActive
              ? "text-white border-b border-white"
              : "hover:text-white"
          }`
        }
      >
        Recent Works
      </NavLink>

      <NavLink
        to="/shop"
        onClick={onNavigate}
        className={({ isActive }) =>
          `${linkClass} transition ${
            isActive
              ? "text-white border-b border-white"
              : "hover:text-white"
          }`
        }
      >
        Shop
      </NavLink>

      <NavLink
        to="/about"
        onClick={onNavigate}
        className={({ isActive }) =>
          `${linkClass} transition ${
            isActive
              ? "text-white border-b border-white"
              : "hover:text-white"
          }`
        }
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        onClick={onNavigate}
        className={({ isActive }) =>
          `${linkClass} transition ${
            isActive
              ? "text-white border-b border-white"
              : "hover:text-white"
          }`
        }
      >
        Contact
      </NavLink>
    </nav>
  );
}

export default Navbar;